import { UPDATE_TAGS } from './actions';

const initialState = {
  1234567 : 'Important'
}

const tagsReducer = ( state = initialState, action) => {
  console.log('Type', action.type, 'Payload : ', action.payload);
  switch(action.type){
    case UPDATE_TAGS: return action.payload; 
    default: return state; 
  }
}

export default tagsReducer;