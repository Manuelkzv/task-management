const TASK_STATUS = {
  INCOMPLETE: 0,
  COMPLETED: 1,
  DELETED: 2,
};

const RES_MESSAGE = {
  GENERAL: {
    INVALID_PARAMS: 'invalid parameters',
  },
  CREATE_TASK: {
    SUCCESS: 'task created successfully',
    ERROR: 'error creating task',
  },
  GET_TASK: {
    SUCCESS: 'success task founded',
    ERROR: 'error getting task',
    NOT_FOUND: 'task not founded',
  },
  GET_ALL_TASKS: {
    SUCCESS: 'success getting all tasks',
    ERROR: 'error getting all tasks',
  },
  REMOVE_TASK: {
    SUCCESS: 'task removed successfully',
    UNSUCCESS: 'task could not be removed',
    ERROR: 'error during remove task. task not removed!',
  },
  UPDATE_TASK: {
    SUCCESS: 'task successfully updated',
    UNSUCCESS: 'task could not be updated',
    ERROR: 'error on updating task',
  },
};

const RES_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  UNSUCCESS: 'unsuccess',
};

module.exports = {
  TASK_STATUS,
  RES_MESSAGE,
  RES_STATUS,
};
