import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducer from './items/reducer';
import authReducer from './authentication/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    items: reducer,
    auth: authReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
