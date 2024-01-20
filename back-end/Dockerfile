FROM node:16

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . .

WORKDIR /usr/src/app/back-end

RUN npm install

EXPOSE 3088

# WORKDIR /usr/src/app

CMD ["npm", "run", "start-docker"]
