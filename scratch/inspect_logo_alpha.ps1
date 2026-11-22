Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo-transparent.png')
$w = $img.Width
$h = $img.Height
Write-Host "Dimensions: $w x $h"

$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

for ($y = 0; $y -lt $h; $y += 2) {
    for ($x = 0; $x -lt $w; $x += 2) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 25) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Alpha > 25 bounds: X=[$minX .. $maxX] (W=$($maxX - $minX)), Y=[$minY .. $maxY] (H=$($maxY - $minY))"
$img.Dispose()
