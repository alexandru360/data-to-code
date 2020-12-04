$json = Get-Content dotnet-tools.json | ConvertFrom-Json

$json.tools.psobject.Properties.Name |
  ForEach-Object { 
		Write-Host $_
		dotnet tool update $_ 
  }