Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path "D:\convergia-frontend\public\images" -File | Where-Object { $_.Extension -match "png|jpg|jpeg" }

foreach ($f in $files) {
    try {
        $img = [System.Drawing.Bitmap]::FromFile($f.FullName)
        $w = $img.Width
        $h = $img.Height
        # Check bottom right 120x120 area in images >= 400px
        if ($w -gt 400 -and $h -gt 300) {
            $count = 0
            for ($x = $w - 120; $x -lt $w; $x += 2) {
                for ($y = $h - 120; $y -lt $h; $y += 2) {
                    $p = $img.GetPixel($x, $y)
                    # Check if pixel has non-background contrast or alpha
                    if ($p.A -gt 30) { $count++ }
                }
            }
            Write-Host "$($f.Name) ($w x $h) - BR corner density: $count"
        }
        $img.Dispose()
    } catch {
        Write-Host "Error reading $($f.Name)"
    }
}
