import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions";

export default (
  state = {
    isSigningUp: false,
    SignUpError: false,
    isAuthenticated: false,
    new_user: {},
    error: {}
  },
  action
) => {
  switch (action.type) {
     case SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        signUpError: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isAuthenticated: true,
        isVerifying: false,
        new_user: action.new_user
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isAuthenticated: false,
        SignUpError: true,
          error: action.error
      };
    default:
      return state;

  }
};