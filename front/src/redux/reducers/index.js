import { combineReducers } from 'redux';
import user from './user-reducer';
import images from './image-reducer';

export default combineReducers({
  user, images
})