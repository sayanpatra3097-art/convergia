$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class LogoExtractor
{
    public static void Extract(string inputPath, string outputPath, int lowThreshold, int highThreshold, int padding)
    {
        using (Bitmap src = new Bitmap(inputPath))
        {
            int w = src.Width;
            int h = src.Height;

            // Sample background color from border margins
            long totalR = 0, totalG = 0, totalB = 0;
            int sampleCount = 0;

            for (int x = 0; x < w; x += 10)
            {
                Color c1 = src.GetPixel(x, 5);
                Color c2 = src.GetPixel(x, h - 6);
                totalR += c1.R + c2.R;
                totalG += c1.G + c2.G;
                totalB += c1.B + c2.B;
                sampleCount += 2;
            }
            for (int y = 0; y < h; y += 10)
            {
                Color c1 = src.GetPixel(5, y);
                Color c2 = src.GetPixel(w - 6, y);
                totalR += c1.R + c2.R;
                totalG += c1.G + c2.G;
                totalB += c1.B + c2.B;
                sampleCount += 2;
            }

            double bgR = (double)totalR / sampleCount;
            double bgG = (double)totalG / sampleCount;
            double bgB = (double)totalB / sampleCount;

            Console.WriteLine(string.Format("Detected Background RGB: ({0:F1}, {1:F1}, {2:F1})", bgR, bgG, bgB));

            // Create 32bpp ARGB bitmap
            using (Bitmap result = new Bitmap(w, h, PixelFormat.Format32bppArgb))
            {
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData resData = result.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                int bytes = Math.Abs(srcData.Stride) * h;
                byte[] srcBuffer = new byte[bytes];
                byte[] resBuffer = new byte[bytes];

                Marshal.Copy(srcData.Scan0, srcBuffer, 0, bytes);

                int minX = w, maxX = 0, minY = h, maxY = 0;

                for (int y = 0; y < h; y++)
                {
                    int rowOffset = y * srcData.Stride;
                    for (int x = 0; x < w; x++)
                    {
                        int idx = rowOffset + x * 4;
                        byte b = srcBuffer[idx];
                        byte g = srcBuffer[idx + 1];
                        byte r = srcBuffer[idx + 2];

                        double dr = r - bgR;
                        double dg = g - bgG;
                        double db = b - bgB;
                        double dist = Math.Sqrt(dr * dr + dg * dg + db * db);

                        double alphaFactor = 0.0;
                        if (dist <= lowThreshold)
                        {
                            alphaFactor = 0.0;
                        }
                        else if (dist >= highThreshold)
                        {
                            alphaFactor = 1.0;
                        }
                        else
                        {
                            // Smooth Hermite interpolation
                            double t = (dist - lowThreshold) / (highThreshold - lowThreshold);
                            alphaFactor = t * t * (3.0 - 2.0 * t);
                        }

                        if (alphaFactor > 0.05)
                        {
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }

                        byte finalA = (byte)Math.Round(alphaFactor * 255.0);
                        
                        // Color decontamination (remove dark bg bias on semi-transparent edge pixels)
                        double finalR = r;
                        double finalG = g;
                        double finalB = b;
                        if (alphaFactor > 0.01 && alphaFactor < 0.99)
                        {
                            finalR = Math.Max(0.0, Math.Min(255.0, (r - bgR * (1.0 - alphaFactor)) / alphaFactor));
                            finalG = Math.Max(0.0, Math.Min(255.0, (g - bgG * (1.0 - alphaFactor)) / alphaFactor));
                            finalB = Math.Max(0.0, Math.Min(255.0, (b - bgB * (1.0 - alphaFactor)) / alphaFactor));
                        }

                        resBuffer[idx] = (byte)Math.Round(finalB);
                        resBuffer[idx + 1] = (byte)Math.Round(finalG);
                        resBuffer[idx + 2] = (byte)Math.Round(finalR);
                        resBuffer[idx + 3] = finalA;
                    }
                }

                Marshal.Copy(resBuffer, 0, resData.Scan0, bytes);
                src.UnlockBits(srcData);
                result.UnlockBits(resData);

                Console.WriteLine(string.Format("Bounding Box: X=[{0}..{1}], Y=[{2}..{3}] (W={4}, H={5})", 
                    minX, maxX, minY, maxY, maxX - minX, maxY - minY));

                // Crop to bounding box + padding
                minX = Math.Max(0, minX - padding);
                minY = Math.Max(0, minY - padding);
                maxX = Math.Min(w - 1, maxX + padding);
                maxY = Math.Min(h - 1, maxY + padding);

                int cropW = maxX - minX + 1;
                int cropH = maxY - minY + 1;

                using (Bitmap cropped = new Bitmap(cropW, cropH, PixelFormat.Format32bppArgb))
                {
                    using (Graphics g = Graphics.FromImage(cropped))
                    {
                        g.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                        g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                        g.DrawImage(result, new Rectangle(0, 0, cropW, cropH), new Rectangle(minX, minY, cropW, cropH), GraphicsUnit.Pixel);
                    }
                    cropped.Save(outputPath, ImageFormat.Png);
                    Console.WriteLine(string.Format("Saved cropped transparent logo to {0} ({1}x{2})", outputPath, cropW, cropH));
                }
            }
        }
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing

$inputPath = "D:\convergia-frontend\public\images\convergia-logo.png"
$outputPath = "D:\convergia-frontend\public\images\convergia-logo-transparent.png"

[LogoExtractor]::Extract($inputPath, $outputPath, 25, 55, 16)
