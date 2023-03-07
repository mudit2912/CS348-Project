# CS348 Project (Milestone 1)

## Pre-Requisites
Must have docker installed.

## Overview
The C5 folder contains the following:

#### Backend Code
The 'backend' directory holds the code for a Node.js server that uses Express to respond to API requests.

#### Database Code
The 'backend' directory also contains the file 'db-setup.sql', which is used to populate the database.
A MySQL server is created by Docker (instructions below), and the commands in 'db-setup.sql' are ran on the server after it is created.

#### Frontend Code
The 'frontend' directory holds the code for a Node.js server that uses React to serve frontend code.

#### Dockerfile
Both the 'backend' and 'frontend' servers contain a 'Dockerfile', which installs the necessary packages before starting the servers.

#### docker-compose.yml
There is a 'docker-compose.yml' file in the root directory.
This docker-compose.yml file defines the services for our full-stack web application, including a MySQL database, a backend server, a frontend server, and a MySQL admin tool. The MySQL database is configured with an initialization script, and all services are connected to a common Docker network. The MySQL admin tool is accessible on port 8080.

## Starting the Application
1. Open terminal
2. cd into milestone_1/C5
3. Build the project with the following command:
```
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
```
4. Run the project in detached mode with the following command:
```
docker-compose up -d
```
5. In just a few moments after the above command has finished running, all the services will be up and running.
6. When you are finished, stop execution with the following command:
```
docker compose down
```
7. If you are getting out of space errors, you may need to run:
```
docker compose prune
```
***Warning:*** This will delete all non-running containers from your machine.

## Demo
Below is a list of features currently supported for Milestone 1, and how to see them in action.

Feel free to open http://localhost:8080 (MySQL Admin service) to take a look at the live database. You can login with:
```
Server: mysqldb
Username: root
Password: !admin!cs348
Database: powerlifting_db
```

#### Authentication
Open http://localhost:3000/login.

As you can see in the User table, a correct login would be:
```
Username: zack_gym
Password: zack123
```

Attempting to login with an incorrect username or password will give the appropriate error messages.
A correct login will display a success message.

This functionality will be extended upon for later submissions.
- We will implement session management to store & maintain authentication states
- /login and /signup will redirect to a home page if user is already logged in, and vice versa if user is not logged in

#### Create Account
Open http://localhost:3000/signup, or click the 'Sign Up' button on the login page.

Go through the basic steps to create an account! An appropriate message will appear at the end of the process.

If your account has been successfully created, you will see two corresponding new entries in the 'Person' and 'User' tables.

You will also be able to go back to http://localhost:3000/login and "login" with the new account.

#### Profiles
Open any of the following to check out some of the profiles in the sample database:
```
http://localhost:3000/u/zack_gym
http://localhost:3000/u/mgupta
http://localhost:3000/u/kabeelanlifts
http://localhost:3000/u/harjot_fitness
http://localhost:3000/u/mrabee
http://localhost:3000/u/admin_lucy
```
This works for any profile, and if you go to localhost:3000/u/username for a username that does not exist, you will be informed that the user does not exist.

Much more profile information will be added to this page for later submissions.

#### Global Leaderboard
Open http://localhost:3000/leaderboard/global to see a leaderboard of the top lifters.

You can choose the maximum number of results and hit 'Load' to query the database.

#### National Leaderboard
Open http://localhost:3000/leaderboard/national to see a leaderboard of the top lifters in a given country.

You can choose the maximum number of results, as well type in as the desired country (try 'USA' or 'Australia'), and hit 'Load' to query the database.

