Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('C:\Users\sayan\.gemini\antigravity\brain\9bb34c8f-2cb7-4ad3-ab5f-1b9185a40d7e\.user_uploaded\media_1795343606171_898f5b9a.jpg')
$w = $img.Width
$h = $img.Height
Write-Host "Uploaded image size: $w x $h"

# Crop middle section (from 30% to 75% height)
$cropY = [int]($h * 0.30)
$cropH = [int]($h * 0.45)
$cropBmp = new-object System.Drawing.Bitmap $w, $cropH
$g = [System.Drawing.Graphics]::FromImage($cropBmp)
$g.DrawImage($img, (new-object System.Drawing.Rectangle 0, 0, $w, $cropH), (new-object System.Drawing.Rectangle 0, $cropY, $w, $cropH), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$cropBmp.Save('D:\convergia-frontend\scratch\middle_crop.jpg')
$cropBmp.Dispose()
$img.Dispose()
Write-Host "Saved middle crop"
