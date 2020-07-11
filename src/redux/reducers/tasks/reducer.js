import { NEW_TASK, DELETE_TASK, UPDATE_TASK } from './actions';

const initialState = {
  'randomid' : {
    title: 'This is a task',
    tags: [],
    timeLapsed: 0,
    startedAt: 0,
    running: false
  }
}

const taskReducer = ( state = initialState, action) => {
  console.log('Type', action.type, 'Payload : ', action.payload);
  switch(action.type){
    case NEW_TASK: 
    case UPDATE_TASK: return {...Object.assign(state, action.payload)}; 
    case DELETE_TASK: delete state[action.payload]; return {...state};
    default: return state; 
  }
}

export default taskReducer;