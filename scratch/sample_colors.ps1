Add-Type -AssemblyName System.Drawing

$filePath = "D:\convergia-frontend\public\images\convergia-logo.png"
$img = [System.Drawing.Bitmap]::FromFile($filePath)

$w = $img.Width
$h = $img.Height

$colorCounts = @{}
$sampleStep = 8

for ($y = 480; $y -le 1480; $y += $sampleStep) {
    for ($x = 380; $x -le 2700; $x += $sampleStep) {
        $p = $img.GetPixel($x, $y)
        $dist = [Math]::Sqrt([Math]::Pow($p.R - 6, 2) + [Math]::Pow($p.G - 22, 2) + [Math]::Pow($p.B - 42, 2))
        if ($dist -gt 40) {
            # Quantize color to 16
            $qr = [Math]::Round($p.R / 24) * 24
            $qg = [Math]::Round($p.G / 24) * 24
            $qb = [Math]::Round($p.B / 24) * 24
            $key = "RGB($qr, $qg, $qb)"
            if (-not $colorCounts.ContainsKey($key)) {
                $colorCounts[$key] = 0
            }
            $colorCounts[$key]++
        }
    }
}

$colorCounts.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Host "$($_.Key) : $($_.Value) samples"
}

$img.Dispose()
