process.env.DB_HOST_LOCAL = 'mongodb://127.0.0.1/';
process.env.DB_HOST_DOCKER = 'mongodb://mongo:27017/';
process.env.DB_NAME = 'tasks-management';

const app = require('./app');
const port = 3088;

app.listen(port);
console.log(`listening on http://localhost:${port}`);
