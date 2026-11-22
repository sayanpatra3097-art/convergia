Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile('D:\convergia-frontend\public\images\convergia-logo-transparent.png')

# Check what pixels exist after X=1980
$found = 0
for ($x = 1980; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $p = $img.GetPixel($x, $y)
        if ($p.A -gt 30) {
            $found++
            if ($found -le 10) {
                Write-Host "Pixel after 1980 at ($x, $y): A=$($p.A), RGB=($($p.R), $($p.G), $($p.B))"
            }
        }
    }
}
Write-Host "Total pixels after X=1980: $found"
$img.Dispose()
