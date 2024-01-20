/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

exports.connectDB = () => {
  let url = process.env.DB_HOST_LOCAL + process.env.DB_NAME;

  console.log('connectDB():ENV', process.env.ENV);
  if (process.env.ENV === 'local') {
    url = process.env.DB_HOST_LOCAL + process.env.DB_NAME;
  }

  if (process.env.ENV === 'docker') {
    url = process.env.DB_HOST_DOCKER + process.env.DB_NAME;
  }
  console.log('connectDB():url', url);

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
};
