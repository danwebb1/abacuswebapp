import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import register from "./register"
import support from "./support";
import notifications from "./notifications";
import portal from "./portal";
export default combineReducers({ auth, user, register, support, notifications, portal });