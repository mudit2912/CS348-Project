# CS348 Project (Milestone 3)

## Pre-Requisites
Must have docker installed.

## Production Database 

#### How We Generated the Production Dataset
Run the following command in the ./C2/prod_dataset_scripts folder:
python3 main.py

Requirements:
Other than installing python3, the following package(s) are required to run:
```
pip install pandas
```

This will create a SQL_SCRIPTS folder. Inside this folder are all the sql statements that need to be run. We consolidated these files ourselves into the db-setup.sql file found in ./C5/backend/db-setup.sql, which is loaded into the MySQL server by Docker, and into the production-db.sql file found in the C2 directory.
If you were to execute these queries manually, you would first run Person.sql and Meet.sql in the MySQL database. Then, run Powerlifter.sql. After that, you can run the rest of the files in whatever order you see fit.

#### Loading Production Data into the DB
As mentioned in the previous subsection, we consolidated the files created by our scripts into the db-setup.sql file, which is loaded into the MySQL server by Docker (db-setup file is located in ./C5/backend/db-setup.sql). You do not have to manually insert any data or run any scripts to have the production DB loaded into the server on boot.

We updated our Python script to be able to directly insert into our MySQL server. Simply run the command
```
python3 main.py
```
And the data can be loaded into the database directly using Python.

Again, this is not needed as we have consolidated the production database into a DB setup file.

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
2. cd into milestone_3/C5
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
Below is a list of features currently supported for Milestone 3, and how to see them in action.

Feel free to open http://localhost:8080 (MySQL Admin service) to take a look at the live database. You can login with:
```
Server: mysqldb
Username: root
Password: !admin!cs348
Database: powerlifting_db
```

List of backend files for implemented features:
- All routes are in ~/C5/backend/allRoutes.js
- Implementation of session management (authentication) is in ~/C5/backend/auth/authStrategy.js

List of frontend files for implemented features:
- Login (~/C5/frontend/src/components/Auth/Login.jsx)
- Create Account (~/C5/frontend/src/components/Auth/SignUp.jsx)
- Profiles (~/C5/frontend/src/components/Profile/ViewProfile.jsx)
- Global Leaderboard (~/C5/frontend/src/components/Leaderboard/Global.jsx)
- National Leaderboard (~/C5/frontend/src/components/Leaderboard/National.jsx)
- Head to Head Comparison (~/C5/frontend/src/components/H2H/Controller.jsx)
- Home Feed (~/C5/frontend/src/components/Home/Controller.jsx)
- Favourite User (~/C5/frontend/src/components/Profile/ViewProfile.jsx)
- Admin Control (All 3 .jsx files in ~/C5/frontend/src/components/Admin)
- Personal Meet Submission (~/C5/frontend/src/components/InsertLifts/Insert.jsx)
- Search Users (~/C5/frontend/src/components/Search/Controller.jsx)
- Edit Profile (~/C5/frontend/src/components/Profile/UpdateProfile.jsx)

## New in Milestone 3:
- Favourite User feature implemented
- Fancy Features (Finalized UI, Admin Control, Personal Meet Submission, User Search, Update Profile)

#### Authentication
Open http://localhost:3000/login.

As you can see in the User table, a correct login would be:
```
Username: zack_gym
Password: zack123
```

Attempting to login with an incorrect username or password will give the appropriate error messages.
A correct login will display a success message.

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

#### Head to Head Comparison
Open http://localhost:3000/h2h to check out the head to head comparison.

Type in any two usernames to display a side-by-side comparison of the two lifter's stats at every single meet.

For example, try mgupta and zack_gym as the two usernames.

If you enter a username that does not exist, then an appropriate error message will be displayed. Also, if you enter a username that has no lifts, an error message will be displayed.

#### Home Feed
Open http://localhost:3000/home to check out the home feed.

In the feed, the recent performances of all of a user's favorite powerlifters will be displayed in chronological order.

#### Favourite User (NEW)
Open http://localhost:3000/u/kabeelanlifts and click "Favourite". You will see that the button changes to say "Unfavourite", and if you reload the page, the button will still stay "Unfavourite". If you go to the home feed, you will see all of @kabeelanlifts's lifts are visible in the feed. Similarly, this will work for any user that is not the current logged in user.

#### Admin Control (NEW)
Head to http://localhost:3000/admin. You can either add a lift for a specific user (for example, try using Powerlifter ID = 3) or create a new meet (enter a meet ID = 5005).

#### Personal Meet Submission (NEW)
Head to http://localhost:3000/insertlift. Then, you can fill in all the appropriate information (for example, try using meet ID = 5) and this new performance will be added.

#### User Search (NEW)
Head to http://localhost:3000/search. Type in whatever your heart desires and usernames will be matched with the string you have typed. Any change will result in a new query, so this is highly responsive. Click on any users displayed in the results, and you will be redirected to their profile page.

#### Edit Profile (NEW)
Click on the profile icon in the top right of the navigation bar. Click "Edit Profile" to bring up the Edit Profile page, where you can choose a new profile picture, username, and/or biography. Make some changes, hit the 'Update' button, and you will be redirected to your new profile page. Additionally, the profile icon in the top right of the navigation bar will redirect to your new username (if you have chosen a new username).
