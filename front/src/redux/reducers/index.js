import { combineReducers } from 'redux';
import user from './user-reducer';
import images from './image-reducer';
import spaces from './spaces-reducer'

export default combineReducers({
  user,
  spaces,
  images
})