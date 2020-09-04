docker build .. -f docker_build_console.txt -t bingo_build_console
docker run -d --rm --name bingo_build_console_container bingo_build_console
docker cp bingo_build_console_container:/app/data-to-code-console/data-to-code-console-win.exe .
docker cp bingo_build_console_container:/app/data-to-code-console/data-to-code-console-linux .
docker cp bingo_build_console_container:/app/data-to-code-console/data-to-code-console-macos .
docker container kill bingo_build_console_container
