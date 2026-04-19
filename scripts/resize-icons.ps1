Add-Type -AssemblyName System.Drawing

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$iconsDir = Join-Path $projectRoot "src\icons"

$srcPath = Join-Path $iconsDir "icon-96.png"

# Sizes needed for Chrome Web Store
$sizes = @(16, 128)

foreach ($size in $sizes) {
    $destPath = Join-Path $iconsDir "icon-$size.png"

    Write-Host "Creating icon-$size.png from icon-96.png..."

    $srcImage = [System.Drawing.Image]::FromFile($srcPath)
    $destImage = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($destImage)

    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graphics.DrawImage($srcImage, 0, 0, $size, $size)

    $destImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $destImage.Dispose()
    $srcImage.Dispose()

    Write-Host "Created: $destPath"
}

Write-Host "`nDone! Created icon-16.png and icon-128.png"
