import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducers from './reducers';

const configureStore = ( intialStore = {}) => {
  let composeEnhancers = compose;

  if (process.env.REACT_APP_NODE_ENV !== 'production' && typeof window === 'object') {
    if(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    }
  }
  
  const store = createStore(
    rootReducers,
    intialStore,
    composeEnhancers()
  );

  const persistor = persistStore(store);
  
  return {store, persistor};
}

export default configureStore;