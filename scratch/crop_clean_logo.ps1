$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class LogoCleaner
{
    public static void CropClean(string inputPath, string outputPath, int x1, int y1, int x2, int y2)
    {
        using (Bitmap src = new Bitmap(inputPath))
        {
            int w = x2 - x1 + 1;
            int h = y2 - y1 + 1;

            using (Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb))
            {
                using (Graphics g = Graphics.FromImage(dest))
                {
                    g.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.DrawImage(src, new Rectangle(0, 0, w, h), new Rectangle(x1, y1, w, h), GraphicsUnit.Pixel);
                }
                dest.Save(outputPath, ImageFormat.Png);
                Console.WriteLine(string.Format("Saved clean logo without watermark to {0}: {1}x{2}", outputPath, w, h));
            }
        }
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing

$input = "D:\convergia-frontend\public\images\convergia-logo.png"

# X=[6 .. 1984], Y=[6 .. 621]
# Add 4px padding: X1=2, Y1=2, X2=1988, Y2=625
$x1 = 2
$y1 = 2
$x2 = 1988
$y2 = 625

$output1 = "D:\convergia-frontend\public\images\convergia-logo.png"
$output2 = "D:\convergia-frontend\public\images\convergia-logo-transparent.png"
$output3 = "D:\convergia-frontend\public\images\convergia-logo-clean.png"

$temp = "D:\convergia-frontend\public\images\convergia-logo-temp.png"
[LogoCleaner]::CropClean($input, $temp, $x1, $y1, $x2, $y2)

[System.IO.File]::Copy($temp, $output1, $true)
[System.IO.File]::Copy($temp, $output2, $true)
[System.IO.File]::Copy($temp, $output3, $true)
[System.IO.File]::Delete($temp)

Write-Host "All logo copies updated without Gemini watermark!"
