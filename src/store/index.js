import reducer from './items/reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const store = createStore(
  combineReducers({
    items: reducer,
  }),
  applyMiddleware(thunk)
);

export default store;
