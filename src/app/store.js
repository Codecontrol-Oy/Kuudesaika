import * as reducers from './reducers';
import promise from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';

const logger = createLogger();
const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(combineReducers({...reducers,
                                            routing: routerReducer
                                          }), middleware);
export default store;
