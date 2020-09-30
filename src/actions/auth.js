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

export const SET_RETRY = "SET_RETRY";
/**
 * Redux action to set Retry
 * @param latch
 * @return {{latch: *, type: string}}
 */
export function setRetry(retry){
    return {
        type: SET_RETRY,
        retry
    }
}

/**
 * Determine if Login request should be made to the API
 * @param state
 * @return {boolean}
 */
function shouldLogin(state){
    const authState = state.auth;
    if(authState.isLoggingIn){
        return false
    }
    return !authState.isAuthenticated
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
/**
 * Do the actual login and dispatch appropriate actions
 * @return {Function}
 */
function doLogin(){
    return function(dispatch, getState){
        if(shouldLogin(getState())){
            dispatch(requestLogin());
            loginUser().then(loggedIn => {
                dispatch(receiveLogin(loggedIn))
            }).catch(error => {
                dispatch(receiveLogin(false, true))
            })
        }
    }
}
/**
 * Helper hook to keep a interval and execute a callback
 * @param callback: function to invoke
 * @param delay: delay in ms to wait between callbacks, set to null to turn off
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    if (delay !== null) {
      return () => clearInterval(id);  //Clear on component un mounting
    } else{
        clearInterval(id); //Clear immediately
    }
  }, [delay]);
}
/**
 * Hook to Login into the api
 * If failure, will retry every 5 seconds
 * @return {boolean[]}[0] is logged in [1] errors have occurred
 */
export function useLogin(){
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.isAuthenticated);
    const error = useSelector(state => state.auth.loginError);
    const retryLatch = useSelector(state => state.auth.retry);
    useEffect(() => {
        if(!error && !loggedIn){
            dispatch(doLogin());
            setRetry(false)
        }
    }, [loggedIn])
    useInterval(() => {
        if(error && !retryLatch){
            dispatch(setRetry(true))
            dispatch(doLogin())
        }
    }, loggedIn ? null : 5000)
    return [loggedIn, error]
}