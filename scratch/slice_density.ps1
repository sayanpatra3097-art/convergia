Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo-transparent.png')
$w = $img.Width
$h = $img.Height

# Print vertical column density of pixels with alpha > 40
$colDensity = New-Object int[] ($w)
for ($x = 0; $x -lt $w; $x += 10) {
    $count = 0
    for ($y = 0; $y -lt $h; $y += 5) {
        if ($img.GetPixel($x, $y).A -gt 40) {
            $count++
        }
    }
    $colDensity[$x] = $count
}

# Group into buckets of 100px
for ($b = 0; $b -lt $w; $b += 100) {
    $sum = 0
    for ($x = $b; $x -lt [Math]::Min($w, $b + 100); $x += 10) {
        $sum += $colDensity[$x]
    }
    Write-Host "Bucket $b..$($b+100): density=$sum"
}

$img.Dispose()
