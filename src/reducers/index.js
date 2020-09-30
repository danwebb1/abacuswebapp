import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import register from "./register"
import support from "./support";
export default combineReducers({ auth, user, register, support });