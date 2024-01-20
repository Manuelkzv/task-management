'use strict';
const task_general = require('../controllers/task/general');
const task_get = require('../controllers/task/get');

const verifyToken = require('../middleware/authMiddleware');

module.exports = (app) => {
  /** GENERAL CRUD **/
  app.post('/api/task', verifyToken, task_general.create);
  app.delete('/api/task/:id', verifyToken, task_general.remove);
  app.put('/api/task/:id', verifyToken, task_general.update);
  app.get('/api/task/:id', verifyToken, task_general.get);

  /** GET LISTS **/
  app.get('/api/task/list/all', verifyToken, task_general.getAll);
  app.get('/api/task/list/all/deleted', verifyToken, task_get.allDeleted);
  app.get('/api/task/list/created-by/:id', verifyToken, task_get.allCreatedBy);
  app.get(
    '/api/task/list/assigned-to/:id',
    verifyToken,
    task_get.allAssignedTo
  );
};
