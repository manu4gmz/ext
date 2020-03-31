import { combineReducers } from 'redux';
import user from './user-reducer';
import images from './image-reducer';
import spaces from './spaces-reducer';
import forms from './form-reducer';
import profile from './profile-reducer';

export default combineReducers({
  user,
  spaces,
  images,
  forms,
  profile,
})