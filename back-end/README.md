# Task: back end

## Start local server without docker and mongo on Docker.

1. Mongo db
   1. Install docker.
   2. Get mongo-db docker.
      ```sh
      docker pull mongo:latest
      ```
   3. Start mongodb with docker.
      ```sh
      docker run -d --name mongodb -p 27017:27017 mongo
      ```
2. Backend project

   1. Move to back-end dir
      ```sh
      cd ~/task-management/back-end/
      ```
   2. Run the command to install all packages
      ```sh
      npm i
      ```
   3. Start the sever

      ```js
      npm run start
      ```

# Endpoints:

## Create task

| METOHD | PATH      | DESC                  |
| ------ | --------- | --------------------- |
| POST   | **/task** | Creates a simple task |

- REQUEST BODY:
  ```json
  {
      "title": "string",
      "status": "number" | "INCOMPLETE",
      "createdBy": "string" | "undefined",
      "assignedTo": "string" | "undefined"
  }
  ```
- RESPONSE
  ```json
  200
  {
      "status": "success",
      "message": "task created successfully",
      "id": "task_id"
  }
  500
  {
      "status": "error",
      "message": "error creating task",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Update task

Updates title and status of a task, also updates lastmodifiedDate

| METOHD | PATH          | DESC                                                              |
| ------ | ------------- | ----------------------------------------------------------------- |
| PUT    | **/task/:id** | Updates title and status of a task, also updates lastmodifiedDate |

- REQUEST PARAMS:
  ```js
  id: string; // Id from a task
  ```
- REQUEST BODY:
  ```json
  {
    "title": "string",
    "status": "number"
  }
  ```
- RESPONSE
  ```json
  200
  {
      "status": "success",
      "message": "task successfully updated"
  }
  404
  {
      "status": "unsuccess",
      "message": "task could not be updated",
  }
  500
  {
      "status": "error",
      "message": "error on updating task",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Get task

| METOHD | PATH          | DESC              |
| ------ | ------------- | ----------------- |
| GET    | **/task/:id** | gets a task by id |

- REQUEST PARAMS:

  ```js
  id: string; // Id from a task
  ```

- RESPONSE:
  ```json
  200
  {
      "status": "success",
      "message": "success task founded",
      "task": {
          "title": "task_5",
          "creationDate": "2024-01-18T17:38:37.988Z",
          "status": 0,
          "lastModifiedDate": "2024-01-18T17:38:37.988Z",
          "createdBy": {
              "name": "someguy",
              "id": "65a852504c39ba831c01b176"
          },
          "assignedTo": {
              "name": "someguy",
              "id": "65a852504c39ba831c01b176"
          },
          "id": "65a9621d8d20e2be79dbba6b"
      }
  }
  404
  {
      "status": "unsuccess",
      "message": "task not founded",
  }
  500
  {
      "status": "error",
      "message": "error getting task",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Get all tasks

| METOHD | PATH               | DESC           |
| ------ | ------------------ | -------------- |
| GET    | **/task/list/all** | gets all tasks |

- RESPONSE
  ```json
  200
  {
      "status": "success",
      "message": "success getting all tasks",
      "data":[
          {
              "title": "new task y",
              "creationDate": "2024-01-18T17:37:37.077Z",
              "status": 1,
              "lastModifiedDate": "2024-01-18T17:37:37.077Z",
              "createdBy": "",
              "assignedTo": "",
              "id": "65a961e18d20e2be79dbba63"
          }
          ,
          ...
          ,
      ]
  }
  500
  {
      "status": "error",
      "message": "error getting all tasks",
      "error": ""
  }
  ```

## Delete task

| METOHD | PATH          | DESC                                 |
| ------ | ------------- | ------------------------------------ |
| DELETE | **/task/:id** | updates status to delete from a task |

- REQUEST PARAMS:
  ```js
  id: string; // Id from a task
  ```
- REPONSE:
  ```json
  200
  {
      "status": "success",
      "message": "task removed successfully",
  }
  404
  {
      "status": "unsuccess",
      "message": "task could not be removed"
  }
  500
  {
      "status": "error",
      "message": "error during remove task. task not removed!",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Get all task created by

| METOHD | PATH                          | DESC                     |
| ------ | ----------------------------- | ------------------------ |
| GET    | **/task/list/created-by/:id** | gets all task by creator |

- REQUEST PARAMS:
  ```js
  id: string; // Id from a createdBy
  ```
- RESPONSE

  ```json

  200
  {
      "status": "success",
      "message": "success getting all tasks",
      "data":[
          {
              "title": "task_5",
              "creationDate": "2024-01-18T17:38:37.988Z",
              "status": 0,
              "lastModifiedDate": "2024-01-18T17:38:37.988Z",
              "createdBy":{
                  "name": "someguy",
                  "id": "65a852504c39ba831c01b176"
              },
              "assignedTo":{
                  "name": "someguy",
                  "id": "65a852504c39ba831c01b176"
              },
              "id": "65a9621d8d20e2be79dbba6b"
          }
      ]
  }
  500
  {
      "status": "error",
      "message": "error getting all tasks",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Get all task assigned by

| METOHD | PATH                           | DESC                    |
| ------ | ------------------------------ | ----------------------- |
| GET    | **/task/list/assigned-to/:id** | gets all task by assign |

- REQUEST PARAMS:
  ```js
  id: string; // Id form user assigned
  ```
- RESPONSE
  ```json
  200
  {
      "status": "success",
      "message": "success getting all tasks",
      "data":[
          {
              "title": "task_5",
              "creationDate": "2024-01-18T17:38:37.988Z",
              "status": 0,
              "lastModifiedDate": "2024-01-18T17:38:37.988Z",
              "createdBy":{
                  "name": "someguy",
                  "id": "65a852504c39ba831c01b176"
              },
              "assignedTo":{
                  "name": "someguy",
                  "id": "65a852504c39ba831c01b176"
              },
              "id": "65a9621d8d20e2be79dbba6b"
          }
      ]
  }
  500
  {
      "status": "error",
      "message": "error getting all tasks",
      "error": ""
  }
  422
  {
      "status": "unsuccess",
      "message": "invalid parameters",
  }
  ```

## Get all deleted tasks

| METOHD | PATH                       | DESC                   |
| ------ | -------------------------- | ---------------------- |
| GET    | **/task/list/all/deleted** | gets all deleted tasks |

- RESPONSE
  ```json
  200
  {
      "status": "success",
      "message": "success getting all tasks",
      "data":[
          {
              "title": "new task y",
              "creationDate": "2024-01-18T17:37:37.077Z",
              "status": 2,
              "lastModifiedDate": "2024-01-18T17:37:37.077Z",
              "createdBy": "",
              "assignedTo": "",
              "id": "65a961e18d20e2be79dbba63"
          }
          ,
          ...
          ,
      ]
  }
  500
  {
      "status": "error",
      "message": "error getting all tasks",
      "error": ""
  }
  ```
