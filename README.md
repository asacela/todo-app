# Getting Started with Todo App

## Setup Environment

Clone into dir on your local machine

Install these things
- node.js
- npm install concurrently
- backend: install cors express mongoose dot-env body-parser (install these from backend dir)
- frontend: install axios bootstrap glyphicons react react-bootstrap react-router-dom (might not need to do this)

## Create Mongo.db User

Go to Mongodb.com and setup a new user account\
Start a free cluster with default settings\
Get your Mongodb api key \
Make two blank files in root dir and in backend/ called .env\
Copy and Paste the api key in the .env files in backend and root dirs\

## That's it your good to go

If there are issues, right in issue page or something...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
You need concurrently module installed for this to work.\
This command runs both the server and react frontend concurrently.

