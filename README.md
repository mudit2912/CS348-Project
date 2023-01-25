# cs348_project

## Pre-Requisites ##
Must have docker installed.

## Instructions ##

- cd into milestone_0
- Build the project with the following command: COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
- Run the project in detached mode with the following command: docker-compose up -d
- To stop execution: docker compose down
- If you are getting out of space errors, you may need to docker compose prune (be careful as this will delete all non-running containers)
