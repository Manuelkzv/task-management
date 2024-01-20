const { User } = require('../../models');
const LOG_TAG = 'controllers::task::utils.js::';

/**
 * Set task users info complete for a task array
 * @param {Object[]} tasks
 * @param {string} tasks[].title
 * @param {Date} tasks[].creationDate
 * @param {number} tasks[].status
 * @param {Date} tasks[].lastModifiedDate
 * @param {string} tasks[].createdBy
 * @param {string} tasks[].assignedTo
 * @returns
 */
const setUsersTasks = async (tasks) => {
  var tasksComplete = [];
  for (const index in tasks) {
    const task = tasks[index];
    try {
      const completeTask = await setUsersTask(task);
      tasksComplete.push({ ...completeTask });
    } catch (error) {
      console.log(LOG_TAG + 'setUsersTasks::error::', error);
    }
  }
  return tasksComplete;
};

/**
 * Complete task user info for a single task
 * @param {Object} task
 * @param {string} task.title
 * @param {Date} task.creationDate
 * @param {number} task.status
 * @param {Date} task.lastModifiedDate
 * @param {string} task.createdBy
 * @param {string} task.assignedTo
 */
const setUsersTask = async (task) => {
  const userCreate = await User.findById(task.createdBy);
  const userAssign = await User.findById(task.assignedTo);

  var taskComplete = {
    title: task.title,
    creationDate: task.creationDate,
    status: task.status,
    lastModifiedDate: task.lastModifiedDate,
    createdBy: '',
    assignedTo: '',
    id: task._id,
  };

  if (userCreate !== null) {
    taskComplete.createdBy = {
      name: userCreate.username,
      id: userCreate._id,
    };
  }
  if (userAssign !== null) {
    taskComplete.assignedTo = {
      name: userAssign.username,
      id: userAssign._id,
    };
  }
  return taskComplete;
};

module.exports = {
  setUsersTasks,
  setUsersTask,
};
