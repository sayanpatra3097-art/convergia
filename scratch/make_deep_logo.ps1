$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class LogoProcessor
{
    public static void Process(string inputPath, string outputPath, int cropMinX, int cropMaxX, int cropMinY, int cropMaxY)
    {
        using (Bitmap src = new Bitmap(inputPath))
        {
            int w = src.Width;
            int h = src.Height;

            int cropX = Math.Max(0, cropMinX);
            int cropY = Math.Max(0, cropMinY);
            int cropW = Math.Min(w - cropX, cropMaxX - cropMinX + 1);
            int cropH = Math.Min(h - cropY, cropMaxY - cropMinY + 1);

            using (Bitmap cropped = new Bitmap(cropW, cropH, PixelFormat.Format32bppArgb))
            {
                using (Graphics g = Graphics.FromImage(cropped))
                {
                    g.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.DrawImage(src, new Rectangle(0, 0, cropW, cropH), new Rectangle(cropX, cropY, cropW, cropH), GraphicsUnit.Pixel);
                }

                BitmapData bmpData = cropped.LockBits(new Rectangle(0, 0, cropW, cropH), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
                int bytes = Math.Abs(bmpData.Stride) * cropH;
                byte[] buffer = new byte[bytes];
                Marshal.Copy(bmpData.Scan0, buffer, 0, bytes);

                for (int y = 0; y < cropH; y++)
                {
                    int rowOffset = y * bmpData.Stride;
                    for (int x = 0; x < cropW; x++)
                    {
                        int idx = rowOffset + x * 4;
                        byte b = buffer[idx];
                        byte g = buffer[idx + 1];
                        byte r = buffer[idx + 2];
                        byte a = buffer[idx + 3];

                        if (a > 5)
                        {
                            // Calculate perceived luminance
                            double lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

                            // Deepen color: rich, deep dark burnished bronze/evergreen-gold
                            // We darken highlights and heavily deepen midtones for high readability on white
                            double darkenFactor = 0.38 + 0.15 * lum; // around 0.40 - 0.50

                            double newR = r * darkenFactor;
                            double newG = g * (darkenFactor * 0.94); // slight warm amber/bronze tint
                            double newB = b * (darkenFactor * 0.72); // reduce blue to enrich deep warm bronze/gold

                            // Enhance alpha sharpness slightly so faint edges don't disappear
                            double alphaEnhanced = Math.Pow((double)a / 255.0, 0.85) * 255.0;

                            buffer[idx] = (byte)Math.Max(0, Math.Min(255, (int)Math.Round(newB)));
                            buffer[idx + 1] = (byte)Math.Max(0, Math.Min(255, (int)Math.Round(newG)));
                            buffer[idx + 2] = (byte)Math.Max(0, Math.Min(255, (int)Math.Round(newR)));
                            buffer[idx + 3] = (byte)Math.Max(0, Math.Min(255, (int)Math.Round(alphaEnhanced)));
                        }
                    }
                }

                Marshal.Copy(buffer, 0, bmpData.Scan0, bytes);
                cropped.UnlockBits(bmpData);

                cropped.Save(outputPath, ImageFormat.Png);
                Console.WriteLine(string.Format("Saved deep logo: {0} ({1}x{2})", outputPath, cropW, cropH));
            }
        }
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing

$input = "D:\convergia-frontend\public\images\convergia-logo-transparent.png"
$output = "D:\convergia-frontend\public\images\convergia-logo.png"

# Crop tightly to non-empty bounds with 8px margin
[LogoProcessor]::Process($input, $output, 10, 2320, 105, 1092)
