$date =Get-Date
$version = $date.ToString("yyyy.M.d.HHmm")

$versionClickOnce=  $date.ToString("yyyy.1MM.1dd.1HHmm")

$revision = $date.ToString("1HHmm")

$files = gci -Path $PSScriptRoot  -Filter "*.csproj" -Recurse 


$files | ForEach-Object -Process {
    
    
    if($_.FullName.Contains("wwwroot")){        return }
    Write-Host $_.FullName
    $xmlFile = [xml](Get-Content -Path $_.FullName)
    $versionXML = $xmlFile.SelectSingleNode("//Version")
    $versionXML.InnerText = $version
    $xmlFile.Save($_.FullName)
 
 }
 # writing click once
$files = gci -Path $PSScriptRoot  -Filter "*.pubxml" -Recurse 
$files | ForEach-Object -Process {
    
    
    if($_.FullName.Contains("wwwroot")){        return }
    
    Write-Host $_.FullName

    $xmlFile = [xml](Get-Content -Path $_.FullName)
    
    
    $versionXML = $xmlFile.SelectSingleNode("//*[local-name()='ApplicationRevision']")
    $versionXML.InnerText = $revision

    $versionXML = $xmlFile.SelectSingleNode("//*[local-name()='ApplicationVersion']")
    $versionXML.InnerText = $versionClickOnce

    $xmlFile.Save($_.FullName)
 
 }