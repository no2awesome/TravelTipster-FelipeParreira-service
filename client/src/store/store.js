import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/main';

export default createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk),
);
