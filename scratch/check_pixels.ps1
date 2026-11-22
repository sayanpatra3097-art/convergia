Add-Type -AssemblyName System.Drawing

$filePath = "D:\convergia-frontend\public\images\convergia-logo.png"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

$w = $img.Width
$h = $img.Height
Write-Host "Dimensions: $w x $h"

$tl = $img.GetPixel(10, 10)
$tr = $img.GetPixel($w - 10, 10)
$bl = $img.GetPixel(10, $h - 10)
$br = $img.GetPixel($w - 10, $h - 10)
$mid = $img.GetPixel([int]($w / 2), [int]($h / 2))

Write-Host "Top-Left: R=$($tl.R), G=$($tl.G), B=$($tl.B), A=$($tl.A)"
Write-Host "Top-Right: R=$($tr.R), G=$($tr.G), B=$($tr.B), A=$($tr.A)"
Write-Host "Bottom-Left: R=$($bl.R), G=$($bl.G), B=$($bl.B), A=$($bl.A)"
Write-Host "Bottom-Right: R=$($br.R), G=$($br.G), B=$($br.B), A=$($br.A)"
Write-Host "Center: R=$($mid.R), G=$($mid.G), B=$($mid.B), A=$($mid.A)"

$img.Dispose()
