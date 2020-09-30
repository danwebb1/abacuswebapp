import {db, Myfirebase} from "../config/firebase";

export const SUPPORT_SUBMIT = "SUPPORT_SUBMIT ";
export const SUPPORT_SUBMIT_SUCCESS = "SUPPORT_SUBMIT_SUCCESS";
export const SUPPORT_SUBMIT_FAILURE = "SUPPORT_SUBMIT_FAILURE";

const supportSubmit = () => {
  return {
    type: SUPPORT_SUBMIT
  };
};
export const supportSubmitSuccess = () => {
  return {
    type: SUPPORT_SUBMIT_SUCCESS,
  };
};
const supportSubmitFailure = () => {
  return {
    type: SUPPORT_SUBMIT_FAILURE
  };
};

export const SubmitSupportForm = (supportObject) => dispatch => {
    dispatch(supportSubmit());
    db.collection('support_forms')
        .add(supportObject)
        .then((ref) => {
            dispatch(supportSubmitSuccess())
        })
        .catch(error => {
          dispatch(supportSubmitFailure(error));
        });
}