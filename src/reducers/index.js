import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import register from "./register"
import support from "./support";
import notifications from "./notifications";
import portal from "./portal";
import inventory from "./inventory";
import settings from "./settings";
import upc from "./upc";
import upc_list from "./upc_list"
export default combineReducers({ auth, user, register, support, notifications, portal, inventory, settings, upc, upc_list});