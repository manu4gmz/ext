import { combineReducers } from 'redux'
import testReducer from './test-reducer'
import loginReducer from './UserReducer'

export default combineReducers({
  test: testReducer,
  user: loginReducer
})