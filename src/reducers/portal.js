import {
    REQUEST_PORTAL,
    RECEIVE_PORTAL,
    PORTAL_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingPortal: false,
    portalError: false,
    receivedPortal: false,
    portal: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_PORTAL:
      return {
        ...state,
        isGettingPortal: true,
        portalError: false,
      };
    case RECEIVE_PORTAL:
      return {
        ...state,
        isGettingPortal: false,
        receivedPortal: true,
        portal: action.portal
      };
    case PORTAL_FAILURE:
      return {
        ...state,
        isGettingPortals: false,
        receivedPortal: false,
        portalError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};