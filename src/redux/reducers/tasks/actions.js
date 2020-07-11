

export const NEW_TASK = 'NEW_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const AddNewTask = (taskObj) => ({
  type: NEW_TASK,
  payload: taskObj,
})

export const DeleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const UpdateTask = (updatedTask) => ({
  type: UPDATE_TASK,
  payload: updatedTask,
});
