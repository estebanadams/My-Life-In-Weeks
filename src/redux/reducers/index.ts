import { combineReducers } from "redux";

import setTasks from "./setTasks";
import setUser from "./setUser";
import setWeeks from "./setWeeks";

export default combineReducers({
  task: setTasks,
  user: setUser,
  weeks: setWeeks
});
