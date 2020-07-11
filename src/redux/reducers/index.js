
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tasksReducer from './tasks/reducer';
import tagsReducer from './tags/reducer';


const persistConfig = { 
  key: 'root',
  storage,
  blacklist: []
};

const rootReducer = combineReducers({
  tasks : tasksReducer,
  tags: tagsReducer
});

export default persistReducer(persistConfig, rootReducer);