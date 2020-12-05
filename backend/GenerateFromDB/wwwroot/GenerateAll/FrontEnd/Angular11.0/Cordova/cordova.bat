docker build -f cordova.txt -t andrei .
docker run --name andreicontainer -d --rm andrei
docker cp andreicontainer:/app/out/myapp.apk .
docker container kill andreicontainer