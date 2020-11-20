    dir env:
    #docker build . --file dockercompose --tag my-image-name:$(date +%s)
    $currentDir = (Get-Item .).FullName
    Write-Host $currentDir
    mkdir $currentDir/out
    $dockers = Get-ChildItem -Path $currentDir/Generated -Filter dockerWin.txt -Recurse | %{$_.FullName}
    Write-Host $dockers
    
    Foreach($file in $dockers){

        Write-Host $file
        $dir =(get-item $file ).Directory
        Write-Host $dir.FullName
        #cd $dir.FullName
        #Write-Host $dir.Name
        Push-Location $dir.FullName
        [Environment]::CurrentDirectory = $dir.FullName
        $nameDockerImage = $dir.Name.ToLower()
        #$nameFile = Split-Path $file.Name -leaf
        Write-Host 'executing ' +  $nameFile
        &"docker" build  -f dockerWin.txt -t  $nameDockerImage .
        $nameDockerContainer =  $nameDockerImage + "container"

        &"docker" run -p 5000:5000 -d  --name $nameDockerContainer --rm $nameDockerImage

        Write-Host "!!!"
        Write-Host "docker" cp ${nameDockerContainer}:/app/out/ $currentDir/out/$nameDockerImage
        dir $currentDir\out          
        Write-Host "!!!"
        &"docker" cp ${nameDockerContainer}:/app/out  $currentDir\out\$nameDockerImage
        &"docker" container kill ${nameDockerContainer}
        dir $currentDir\out
        # pause
        # gci $currentDir/out -recurse -name
        Pop-Location

    }
    dir $currentDir\out  
    #spa copy files
    $spa = @(Get-ChildItem -Path $currentDir/out -Filter Angular* -Recurse | %{$_.FullName})
    $backend=@(Get-ChildItem -Path $currentDir/out -Filter wwwroot* -Recurse | %{$_.FullName})
    Write-Host ($spa.length -eq 1)
    Write-Host ($backend.length -gt 0)
    if($spa.length -eq 1 ){
        if($backend.length -gt 0){
        Foreach($file in $backend){    
            Copy-Item -Path $spa\*.* -Destination $file -Force -Recurse	
        }
    }
        if($false){
            # find if cordova exists
            Copy-Item -Path $spa\*.* -Destination $currentDir/Generated/FrontEnd/Angular10.0/Cordova/wwwroot/          
            $fileJS = @(Get-ChildItem -Path $currentDir/Generated/FrontEnd/Angular10.0/Cordova/wwwroot/ -Filter main* -Recurse | %{$_.FullName})
            Write-Host $fileJS
            $pathDemo = "http://demo.adces.ro:8080/" + $Env:GITHUB_REF_SLUG + "/"

            $replaceBaseUrl = "('" + $pathDemo +"'+";
            $find =  '(this.baseUrl+';
            Foreach($file in $fileJS){    
            ((Get-Content -path $file -Raw) -replace  [regex]::escape($find),$replaceBaseUrl) | Set-Content -Path $file
            }
            Push-Location $currentDir/Generated/FrontEnd/Angular10.0/Cordova/
            &"docker" build  -f cordova.txt -t  cordovaimage .
            &"docker" run -d  --name cordovacontainer --rm cordovaimage
            &"docker" cp cordovacontainer:/app/out  $currentDir/out/cordovaimage
            &"docker" container kill cordovacontainer
        }
        Pop-Location
    }