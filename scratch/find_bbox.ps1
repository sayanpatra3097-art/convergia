Add-Type -AssemblyName System.Drawing

$filePath = "D:\convergia-frontend\public\images\convergia-logo.png"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

$w = $img.Width
$h = $img.Height

$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

$bgR = 6
$bgG = 22
$bgB = 42

$step = 4
$brightPixels = 0

# Sample grid
for ($y = 0; $y -lt $h; $y += $step) {
    for ($x = 0; $x -lt $w; $x += $step) {
        $p = $img.GetPixel($x, $y)
        # Calculate Euclidean distance from background color
        $dist = [Math]::Sqrt([Math]::Pow($p.R - $bgR, 2) + [Math]::Pow($p.G - $bgG, 2) + [Math]::Pow($p.B - $bgB, 2))
        
        # If noticeably different from background
        if ($dist -gt 35) {
            $brightPixels++
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Bright/Logo Pixels: $brightPixels"
Write-Host "Bounding box: X=$minX to $maxX (Width=$($maxX - $minX)), Y=$minY to $maxY (Height=$($maxY - $minY))"

# Sample 5 pixels inside the logo
$midX = [int](($minX + $maxX) / 2)
$midY = [int](($minY + $maxY) / 2)
$pMid = $img.GetPixel($midX, $midY)
Write-Host "Logo Center pixel at ($midX, $midY): R=$($pMid.R), G=$($pMid.G), B=$($pMid.B)"

$img.Dispose()
