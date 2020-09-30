import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingProfile: false,
    profileError: false,
    receivedProfile: false,
    user_profile: {},
  },
  action
) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isGettingProfile: true,
        profileError: false,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        isGettingProfile: false,
        receivedProfile: true,
        user_profile: action.user_profile
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        isGettingProfile: false,
        receivedProfile: false,
        profileError: true
      };
    default:
      return state;
  }
};