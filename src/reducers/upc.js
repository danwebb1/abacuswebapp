import {
    REQUEST_UPC,
    RECEIVED_UPC,
    UPC_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingUpc: false,
    upcError: false,
    receivedUpc: false,
    upc: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_UPC:
      return {
        ...state,
        isGettingUpc: true,
        upcError: false,
      };
    case RECEIVED_UPC:
      return {
        ...state,
        isGettingUpc: false,
        receivedUpc: true,
        upc: action.upc
      };
    case UPC_FAILURE:
      return {
        ...state,
        isGettingUpc: false,
        receivedUpc: false,
        upcError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};