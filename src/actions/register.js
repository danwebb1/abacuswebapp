import {db, Myfirebase} from "../config/firebase";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

const requestSignUp = () => {
  return {
    type: SIGNUP_REQUEST
  };
};
const receiveSignUp = new_user => {
  return {
    type: SIGNUP_SUCCESS,
    new_user
  };
};
const SignUpError = (error) => {
  return {
    type: SIGNUP_FAILURE,
      error
  };
};


export const SignUpUser = (userObject) => dispatch => {
  dispatch(requestSignUp());
  Myfirebase
    .auth()
    .createUserWithEmailAndPassword(userObject.email, userObject.password)
    .then(user => {
      userObject.uid = user.user.uid;
      delete userObject.password;
      delete userObject.password2;
      dispatch(receiveSignUp(userObject));
      return db.collection('users')
          .doc(userObject.uid)
          .set(userObject)
    })
    .catch(error => {
      dispatch(SignUpError(error));
    });
};
