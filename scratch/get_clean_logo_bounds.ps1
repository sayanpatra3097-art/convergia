Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo.png')
$w = $img.Width
$h = $img.Height

# Scan for logo pixels strictly for X < 2100
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0;

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt 2100; $x++) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 30) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Real Logo (excluding watermark) Bounds:"
Write-Host "X=[$minX .. $maxX] (Width = $($maxX - $minX + 1))"
Write-Host "Y=[$minY .. $maxY] (Height = $($maxY - $minY + 1))"

$img.Dispose()
