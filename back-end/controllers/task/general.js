/* eslint-disable no-unused-vars */
const { Task } = require('../../models');
const { TASK_STATUS, RES_MESSAGE, RES_STATUS } = require('./values');
const { setUsersTask, setUsersTasks } = require('./utils');
const LOG_TAG = 'controllers::task::general.js::';

/**
 * Creates a basic task
 * @param {Object} req Request
 * @param {Object} req.body Request body
 * @param {string} req.body.title
 * @param {number} [req.body.status=0] Default 0 | Incomplete
 * @param {string} [req.body.createdBy=] - Task created by
 * @param {string} [req.body.assignedTo=] - Task assign to
 */
const create = async (req, res) => {
  var task = newTask(req.body);

  task.createdBy = req.userId;

  console.log(LOG_TAG + 'create::task', task);

  if (!validTask(task)) {
    console.log(LOG_TAG + 'create::task-not-valid::params', task);
    return res.status(422).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
      params: task,
    });
  }

  try {
    const taskMongo = new Task({ ...task });
    await taskMongo.save();
    console.log(LOG_TAG + 'create::task::success', taskMongo);

    return res.status(200).json({
      status: RES_STATUS.SUCCESS,
      message: RES_MESSAGE.CREATE_TASK.SUCCESS,
      id: taskMongo._id,
    });
  } catch (error) {
    console.error(LOG_TAG + 'create::try-block::error', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.CREATE_TASK.ERROR,
      error,
    });
  }
};

/**
 * Gets a single task record
 * @param {Object} req Request
 * @param {Object} req.params request params
 * @param {number} req.params.id - Task id
 */
const get = async (req, res) => {
  console.log(LOG_TAG + 'get');
  const taskId = req.params?.id;
  console.log(LOG_TAG + 'get::', taskId);
  if (taskId !== undefined) {
    try {
      const task = await Task.findById(taskId);
      console.log(LOG_TAG + 'get::task::', task);

      if (task !== null) {
        const taskComplete = await setUsersTask(task);
        console.log(LOG_TAG + 'get::task::', taskComplete);

        return res.status(200).json({
          status: RES_STATUS.SUCCESS,
          message: RES_MESSAGE.GET_TASK.SUCCESS,
          task: taskComplete,
        });
      }

      return res.status(404).json({
        status: RES_STATUS.UNSUCCESS,
        message: RES_MESSAGE.GET_TASK.NOT_FOUND,
      });
    } catch (error) {
      console.error(LOG_TAG + 'get::catch::error::', error);
      return res.status(500).json({
        status: RES_STATUS.ERROR,
        message: RES_MESSAGE.GET_TASK.ERROR,
        error,
      });
    }
  }
  console.log(LOG_TAG + 'get::no task id');
  return res.status(422).json({
    status: RES_STATUS.UNSUCCESS,
    message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
  });
};

/**
 * Gets all tasks but deleted
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
  console.log(LOG_TAG + 'getAll');
  try {
    const tasks = await Task.find({ status: { $ne: TASK_STATUS.DELETED } });
    console.log(LOG_TAG + 'getAll::find::task-length::', tasks.length);

    const completeTasks = await setUsersTasks(tasks);
    console.log(
      LOG_TAG + 'getAll::find::complete-task-length::',
      completeTasks.length
    );

    return res.status(200).json({
      status: RES_STATUS.SUCCESS,
      message: RES_MESSAGE.GET_ALL_TASKS.SUCCESS,
      data: completeTasks,
    });
  } catch (error) {
    console.error(LOG_TAG + 'getAll::error::', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.GET_ALL_TASKS.ERROR,
      error,
    });
  }
};

/**
 * Updates task status to deleted
 * @param {Object} req Request
 * @param {Object} req.params request params
 * @param {number} req.params.id - Task id
 */
const remove = async (req, res) => {
  console.log(LOG_TAG + 'remove');
  const taskId = req.params?.id;
  console.log(LOG_TAG + 'remove::', taskId);

  if (taskId !== undefined) {
    try {
      const update = await Task.updateOne(
        { _id: taskId },
        { status: TASK_STATUS.DELETED }
      );
      console.log(LOG_TAG + 'remove::task::', update);

      if (update.modifiedCount == 1) {
        console.log(LOG_TAG + 'remove::success');
        return res.status(200).json({
          status: RES_STATUS.SUCCESS,
          message: RES_MESSAGE.REMOVE_TASK.SUCCESS,
        });
      }

      console.log(LOG_TAG + 'remove::unsuccess');
      return res.status(404).json({
        status: RES_STATUS.UNSUCCESS,
        message: RES_MESSAGE.REMOVE_TASK.UNSUCCESS,
      });
    } catch (error) {
      console.error(LOG_TAG + 'remove::catch::error::', error);
      return res.status(500).json({
        status: RES_STATUS.ERROR,
        message: RES_MESSAGE.REMOVE_TASK.ERROR,
        error,
      });
    }
  } else {
    console.log(LOG_TAG + 'remove::no task id');
    return res.status(422).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
    });
  }
};

/**
 * Updates title and status of a task
 * also updates the lastmodified date
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id - task id
 * @param {Object} req.body
 * @param {string} req.body.title - task title
 * @param {number} req.body.status - task status
 */
const update = async (req, res) => {
  console.log(LOG_TAG + 'update');
  const taskId = req.params?.id;
  const title = req.body?.title;
  const status = req.body?.status;
  console.log(
    LOG_TAG + `update::taskid:${taskId}::title:${title}::status:${status}`
  );

  if (!validUpdateParams(taskId, title, status)) {
    console.log(LOG_TAG + 'update::no task id');
    return res.status(422).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
    });
  }

  try {
    const update = await Task.updateOne(
      { _id: taskId },
      {
        title: title,
        status: status,
        lastModifiedDate: new Date(),
      }
    );

    console.log(LOG_TAG + 'update::task::', update);

    if (update.modifiedCount == 1) {
      console.log(LOG_TAG + 'update::success');
      return res.status(200).json({
        status: RES_STATUS.SUCCESS,
        message: RES_MESSAGE.UPDATE_TASK.SUCCESS,
      });
    }

    console.log(LOG_TAG + 'update::unsuccess');
    return res.status(404).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.UPDATE_TASK.UNSUCCESS,
    });
  } catch (error) {
    console.error(LOG_TAG + 'update::catch::error::', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.UPDATE_TASK.ERROR,
      error,
    });
  }
};

/**
 * Validate update params
 * @param {string} id
 * @param {string} title
 * @param {number} status
 */
const validUpdateParams = (id, title, status) => {
  return (
    id !== undefined &&
    id !== '' &&
    title !== undefined &&
    title !== '' &&
    status !== undefined &&
    status !== ''
  );
};

/**
 * Validates required params from a task
 * @param {Object} task
 * @param {string} task.title
 * @param {Date} task.creationDate
 * @param {number} task.status
 * @param {Date} task.lastModifiedDate
 * @param {string} task.createdBy
 * @param {string} task.assignedTo
 */
const validTask = (task) => {
  return task.title !== undefined && task.title !== '';
};

/**
 * Parses request body to task model
 * @param {Object} body
 * @param {string} body.title
 * @param {number} body.status
 * @param {string} body.createdBy
 * @param {string} body.assignedTo
 * @returns
 */
const newTask = (body) => {
  return {
    title: body?.title,
    creationDate: new Date(),
    status: body?.status || TASK_STATUS.INCOMPLETE,
    lastModifiedDate: new Date(),
    createdBy: body?.createdBy,
    assignedTo: body?.assignedTo,
  };
};

module.exports = {
  create,
  get,
  getAll,
  remove,
  update,
};
