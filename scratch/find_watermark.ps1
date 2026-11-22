Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo.png')
$w = $img.Width
$h = $img.Height
Write-Host "Image size: $w x $h"

# Look for small marks or clusters, especially near bottom-right or bottom-left or bottom corners
# Let's inspect the 4 corners:
# Bottom-left: x from 0 to 300, y from h-300 to h
# Bottom-right: x from w-300 to w, y from h-300 to h
# Top-left: x from 0 to 300, y from 0 to 300
# Top-right: x from w-300 to w, y from 0 to 300

function CheckRegion($name, $x1, $y1, $x2, $y2) {
    $count = 0
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0;
    for ($y = $y1; $y -le $y2; $y++) {
        for ($x = $x1; $x -le $x2; $x++) {
            if ($x -ge 0 -and $x -lt $w -and $y -ge 0 -and $y -lt $h) {
                $p = $img.GetPixel($x, $y)
                if ($p.A -gt 30) {
                    $count++
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
    }
    Write-Host "$name : $count non-transparent pixels. Bounds: X=[$minX..$maxX], Y=[$minY..$maxY]"
}

CheckRegion "Bottom-Left" 0 ($h - 200) 250 ($h - 1)
CheckRegion "Bottom-Right" ($w - 250) ($h - 200) ($w - 1) ($h - 1)
CheckRegion "Bottom-Center" ([int]($w/2) - 150) ($h - 200) ([int]($w/2) + 150) ($h - 1)
CheckRegion "Around (1165, h-100)" 1100 ($h - 150) 1250 ($h - 1)

$img.Dispose()
