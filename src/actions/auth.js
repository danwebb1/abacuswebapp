import {db, Myfirebase} from "../config/firebase";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_FINISHED = "VERIFY_FINISHED";


const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};
const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};
const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

export const verifyFinished = () => {
  return {
    type: VERIFY_FINISHED,
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  Myfirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
      dispatch(verifyFinished())
    })
    .catch(error => {
      dispatch(loginError(error));
      dispatch(verifyFinished())
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  Myfirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
      dispatch(verifyFinished())
    })
    .catch(error => {
      dispatch(logoutError());
      dispatch(verifyFinished())
    });
};
export const CLEAR_ERROR = "CLEAR_ERROR";

/**
 * Redux Action to clear errors
 * @return {{type: string}}
 */
export function clearError(){
    return {
        type: CLEAR_ERROR
    }
}


export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  Myfirebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(receiveLogin(user));
        dispatch(verifyFinished())
      } else {
        dispatch(logoutUser());
      }
    });
};

