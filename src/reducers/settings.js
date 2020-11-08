import {
    REQUEST_SETTINGS,
    RECEIVE_SETTINGS,
    SETTINGS_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingSettings: false,
    settingsError: false,
    receivedSettings: false,
    settings: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_SETTINGS:
      return {
        ...state,
        isGettingSettings: true,
        settingsError: false,
      };
    case RECEIVE_SETTINGS:
      return {
        ...state,
        isGettingSettings: false,
        receivedSettings: true,
        settings: action.settings
      };
    case SETTINGS_FAILURE:
      return {
        ...state,
        isGettingSettings: false,
        receivedSettings: false,
        settingsError: true,
        errors: action.error
      };
    default:
      return state;
  }
};