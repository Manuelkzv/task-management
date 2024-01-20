# Task Management

Task Manager app is a dashboard where you can control your tasks in an easier way!
It's a responsive app, so you can open it anywhere!

## Getting started

To run this project locally clone this repo and follow the steps written in the next sections.

Don't forget to review the Specifications section to be sure you have what you need to run the project.

### Run backend

1. Install dependencies: `npm install`
2. Run the project: `docker-compose up --build`
3. Wait for docker to finish installing and run through the necessary steps, you will see a message like: `node-mongo-app  | Database connected: mongodb://mongo:27017/tasks-management`
4. Open the app status endpoint: [localhost:3088/app/status](http://localhost:3088/app/status/)
5. in the browser you will see the message indicating that everything is in order: `POC Task Management`

### Run frontend

1. Opens a new terminal
2. Navigate to the `task-frontend` folder
3. Install dependencies: `npm install`
4. Run the project: `npm run start`
5. Open the app: [localhost:4200](http://localhost:4200/)

## Specifications

You need to have installed:

1. NodeJS v16
2. Angular CLI v15
3. Docker

### Frontend

The front has been built with Angular 15:

```
Angular CLI: 15.0.5
Node: ^16.20.0
Package Manager: npm ^8.19.3
```

Packages and dependencies:

```
"@angular/material": "^15.2.9",
"rxjs": "~7.5.0",
```

### Backend

The back has been built with Nodejs 16:

```
Node: ^16.20.0
Package Manager: npm ^8.19.3
```

Packages and dependencies:

```
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.1.0"

```

## Project status

This project has been build to apply to ----.
Modules to improve:

1. Implementation and status management.
