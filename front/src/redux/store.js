import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//export default createStore(reducer, composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware)));
export default createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));