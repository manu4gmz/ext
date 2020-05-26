import { combineReducers } from "redux";
import spaces from "./spaces-reducer";
import users from "./users-reducer";

export default combineReducers({
  spaces, users
});