Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo-transparent.png')

$minX = $img.Width; $maxX = 0; $minY = $img.Height; $maxY = 0;

for ($x = 0; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 40) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Exact Alpha>40 Bounds: X=[$minX .. $maxX] (W=$($maxX - $minX)), Y=[$minY .. $maxY] (H=$($maxY - $minY))"
$img.Dispose()
