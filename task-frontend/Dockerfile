
FROM node:16 as build

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . .

WORKDIR /usr/src/app/task-frontend
RUN npm install
RUN npm run build:prod

WORKDIR /usr/src/app

# Serve Application using Nginx Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/task-frontend/dist/task-frontend/ /usr/share/nginx/html
EXPOSE 100
