'use strict';

const express = require('express'),
  app = express(),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors');

const dbService = require('./services/db');

//Activate middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Main Status message for server
app.get('/app/status', async (req, res) => {
  let responseMessage = '';
  responseMessage = 'POC Task Management';

  res.status(200).send(responseMessage);
});

try {
  dbService.connectDB();
} catch (error) {
  console.log('error on db initialization', error);
}

const recursiveRoutes = (folderName) => {
  fs.readdirSync(folderName).forEach((file) => {
    const fullName = path.join(folderName, file);
    const stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      recursiveRoutes(fullName);
    } else if (file.toLowerCase().indexOf('.js')) {
      require(fullName)(app);
    }
  });
};

recursiveRoutes(`${__dirname}/routes`);

module.exports = app;
