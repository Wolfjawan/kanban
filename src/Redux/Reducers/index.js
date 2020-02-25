import { combineReducers } from "redux";
import volunteers from "./volunteerReducer";
import lists from "./ListsReducer";

export default combineReducers({
  volunteers,
  lists
});
