const { Task } = require('../../models');
const { TASK_STATUS, RES_MESSAGE, RES_STATUS } = require('./values');
const LOG_TAG = 'controllers::task::get.js::';
const { setUsersTasks } = require('./utils');

/**
 * Gets all tasks filter by createdBy prop
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id createdBy id
 * @param {*} res
 * @returns
 */
const allCreatedBy = async (req, res) => {
  console.log(LOG_TAG + 'allCreatedBy');
  const id = req.params?.id;
  console.log(LOG_TAG + 'allCreatedBy::id::' + id);

  if (!id) {
    console.log(LOG_TAG + 'allCreatedBy::no created id');
    return res.status(422).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
    });
  }
  try {
    const tasks = await Task.find({
      status: { $ne: TASK_STATUS.DELETED },
      createdBy: id,
    });
    console.log(LOG_TAG + 'allCreatedBy::find::task-length::', tasks.length);

    const completeTasks = await setUsersTasks(tasks);
    console.log(
      LOG_TAG + 'allCreatedBy::find::complete-task-length::',
      completeTasks.length
    );

    return res.status(200).json({
      status: RES_STATUS.SUCCESS,
      message: RES_MESSAGE.GET_ALL_TASKS.SUCCESS,
      data: completeTasks,
    });
  } catch (error) {
    console.error(LOG_TAG + 'allCreatedBy::error::', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.GET_ALL_TASKS.ERROR,
      error,
    });
  }
};

/**
 * Gets all tasks filter by assignedTo prop
 * @param {Object} req
 * @param {Object} req.params
 * @param {string} req.params.id assignedTo id
 * @param {*} res
 * @returns
 */
const allAssignedTo = async (req, res) => {
  console.log(LOG_TAG + 'allAssignedTo');
  const id = req.params?.id;
  console.log(LOG_TAG + 'allAssignedTo::id::' + id);

  if (!id) {
    console.log(LOG_TAG + 'allAssignedTo::no created id');
    return res.status(422).json({
      status: RES_STATUS.UNSUCCESS,
      message: RES_MESSAGE.GENERAL.INVALID_PARAMS,
    });
  }

  try {
    const tasks = await Task.find({
      status: { $ne: TASK_STATUS.DELETED },
      assignedTo: id,
    });
    console.log(LOG_TAG + 'allAssignedTo::find::task-length::', tasks.length);

    const completeTasks = await setUsersTasks(tasks);
    console.log(
      LOG_TAG + 'allAssignedTo::find::complete-task-length::',
      completeTasks.length
    );

    return res.status(200).json({
      status: RES_STATUS.SUCCESS,
      message: RES_MESSAGE.GET_ALL_TASKS.SUCCESS,
      data: completeTasks,
    });
  } catch (error) {
    console.error(LOG_TAG + 'allAssignedTo::error::', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.GET_ALL_TASKS.ERROR,
      error,
    });
  }
};

/**
 * Gets all delted tasks
 * @param {Object} req
 * @param {*} res
 * @returns
 */
const allDeleted = async (req, res) => {
  console.log(LOG_TAG + 'allDeleted');
  try {
    const tasks = await Task.find({
      status: TASK_STATUS.DELETED,
    });
    console.log(LOG_TAG + 'allDeleted::find::task-length::', tasks.length);

    const completeTasks = await setUsersTasks(tasks);
    console.log(
      LOG_TAG + 'allDeleted::find::complete-task-length::',
      completeTasks.length
    );

    return res.status(200).json({
      status: RES_STATUS.SUCCESS,
      message: RES_MESSAGE.GET_ALL_TASKS.SUCCESS,
      data: completeTasks,
    });
  } catch (error) {
    console.error(LOG_TAG + 'allDeleted::error::', error);
    return res.status(500).json({
      status: RES_STATUS.ERROR,
      message: RES_MESSAGE.GET_ALL_TASKS.ERROR,
      error,
    });
  }
};

module.exports = {
  allCreatedBy,
  allAssignedTo,
  allDeleted,
};
