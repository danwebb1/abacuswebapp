import {db} from "../config/firebase";
import user from "../reducers/user";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

const requestProfile = () => {
  return {
    type: PROFILE_REQUEST
  };
};
export const receiveProfile = user_profile => {
  return {
    type: PROFILE_SUCCESS,
    user_profile
  };
};
const getProfileError = (error) => {
  return {
    type: PROFILE_FAILURE,
     error
  };
};

export const getProfile = (uid) => dispatch => {
    if (uid) {
        dispatch(requestProfile());
        db.collection('users')
            .doc(uid)
            .get()
            .then(profile => {
                dispatch(receiveProfile(profile.data()))
            })
            .catch(error => {
                dispatch(getProfileError(error));
            });
    }
}