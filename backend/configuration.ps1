$version = Get-Date -Format "yyyy.M.d.HHmm"


$files = gci -Path $PSScriptRoot  -Filter "*.csproj" -Recurse 
$files.length

$files | ForEach-Object -Process {
    
    
    if($_.FullName.Contains("wwwroot")){        return }
    Write-Host $_.FullName
    $xmlFile = [xml](Get-Content -Path $_.FullName)
    $versionXML = $xmlFile.SelectSingleNode("//Version")
    $versionXML.InnerText = $version
    $xmlFile.Save($_.FullName)
 
 }