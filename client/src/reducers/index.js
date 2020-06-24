import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import post from "./post";
import profile from "./profile";
import room from "./room";

export default combineReducers({ alert, auth, post, profile, room });
