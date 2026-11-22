Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo.png')
$w = $img.Width
$h = $img.Height

Write-Host "Analyzing true logo core bounds..."

# Let's find columns where there is significant pixel density
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0;

for ($x = 0; $x -lt $w; $x += 4) {
    for ($y = 0; $y -lt $h; $y += 4) {
        $p = $img.GetPixel($x, $y)
        $dist = [Math]::Sqrt([Math]::Pow($p.R - 8, 2) + [Math]::Pow($p.G - 24, 2) + [Math]::Pow($p.B - 44, 2))
        if ($dist -gt 45) {
            # Check if this pixel has neighbors (not stray noise)
            $neighbors = 0
            foreach ($dx in @(-4, 0, 4)) {
                foreach ($dy in @(-4, 0, 4)) {
                    $nx = $x + $dx
                    $ny = $y + $dy
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        $np = $img.GetPixel($nx, $ny)
                        $ndist = [Math]::Sqrt([Math]::Pow($np.R - 8, 2) + [Math]::Pow($np.G - 24, 2) + [Math]::Pow($np.B - 44, 2))
                        if ($ndist -gt 45) { $neighbors++ }
                    }
                }
            }
            if ($neighbors -ge 4) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
}

Write-Host "True Core Logo Bounds: X=[$minX .. $maxX] (W=$($maxX - $minX)), Y=[$minY .. $maxY] (H=$($maxY - $minY))"
$img.Dispose()
