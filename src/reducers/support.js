import {
SUPPORT_SUBMIT,
SUPPORT_SUBMIT_SUCCESS,
SUPPORT_SUBMIT_FAILURE,
} from "../actions/";

export default (
  state = {
    isSubmittingSupportForm: false,
    supportFormSubmitError: false,
    supportFormSubmitSuccess: false,
    supportFormSubmitErrors: {}
  },
  action
) => {
  switch (action.type) {
    case SUPPORT_SUBMIT:
      return {
        ...state,
        isSubmittingSupportForm: true,
        supportFormSubmitError: false,
      };
    case SUPPORT_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmittingSupportForm: false,
        supportFormSubmitSuccess: true,
      };
    case SUPPORT_SUBMIT_FAILURE:
      return {
        ...state,
        isSubmittingSupportForm: false,
        supportFormSubmitSuccess: false,
        supportFormSubmitError: true,
        supportFormSubmitErrors: action.errors
      };
    default:
      return state;
  }
};