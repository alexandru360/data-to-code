docker build .. -f docker_ci_test.txt -t bingo_ci_test
docker run -d --rm --name bingo_ci_test_container bingo_ci_test
docker cp bingo_ci_test_container:/app/data-to-code-objects-test/jest-stare .
docker cp bingo_ci_test_container:/app/data-to-code-objects-test/junit.xml .
docker cp bingo_ci_test_container:/app/data-to-code-objects-test/coverage/cobertura-coverage.xml .
docker container kill bingo_ci_test_container
