$jsonPath = "C:\Users\rames\.gemini\antigravity-ide\brain\9eb8f06f-bdde-4d52-8563-264beb6e6f48\.system_generated\steps\44\output.txt"
$outDir = "d:\TeamManger\stitch_screens"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$data = Get-Content -Raw -Path $jsonPath | ConvertFrom-Json
$requestedIds = @(
    "bcabb42b0c034709b7ced45257332ce9", "f6d14530f9a64487bca10c93fb1657c7", "2b2446738c7a423696ae41251630deaa",
    "526e96da4937488198a33a04e6daa373", "0c4dd23c559744848fc61cf20fce9164", "30f8551a3e7c4d3595ca02209b93a769",
    "35367ca0b4d54a17b43dd6ff85339802", "36bc542ce4044654aa11d588f65778d9", "37036c17d57b4350a60538e1d45d2418",
    "9da5a6d065974c5fbf908e1b351d5761", "b99556d32a134d6496a59caa2c9fff6e", "fe39cc4ad3304cd6826751a22b0d8a16",
    "3987f4280cb24b79a58cf7a8a80bdbed", "e14463acb4a646df984a3958dbbac2ae", "b9c8bcffb41a42eb9187e023ee6698ca",
    "3cf0b93ab1fa47f7932936390aafe742", "81a97632d10f4fc2be3b2ee175d12a9f", "cfed1cb74ae845d0a6b3ddc6f7c34ced",
    "7af02bb5e05044d7a461530c79e83520"
)

foreach ($screen in $data.screens) {
    $id = $screen.name.Split("/")[-1]
    if ($requestedIds -contains $id) {
        $title = $screen.title -replace '[\\/:*?"<>|]', ''
        
        $imgUrl = $screen.screenshot.downloadUrl
        if ($imgUrl) {
            $imgPath = Join-Path $outDir "${title}_${id}.png"
            Write-Host "Downloading $imgPath"
            curl.exe -s -L $imgUrl -o $imgPath
        }
        
        $htmlUrl = $screen.htmlCode.downloadUrl
        if ($htmlUrl) {
            $htmlPath = Join-Path $outDir "${title}_${id}.html"
            Write-Host "Downloading $htmlPath"
            curl.exe -s -L $htmlUrl -o $htmlPath
        }
    }
}
Write-Host "Done downloading screens."
