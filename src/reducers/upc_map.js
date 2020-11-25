import {
    REQUEST_UPC_MAP,
    RECEIVED_UPC_MAP,
    UPC_MAP_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingUpcMap: false,
    upcListError: false,
    receivedUpcMap: false,
    upc_map: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_UPC_MAP:
      return {
        ...state,
        isGettingUpcMap: true,
        upcMapError: false,
      };
    case RECEIVED_UPC_MAP:
      return {
        ...state,
        isGettingUpcMap: false,
        receivedUpcMap: true,
        upc: action.upc_map
      };
    case UPC_MAP_FAILURE:
      return {
        ...state,
        isGettingUpcMap: false,
        receivedUpcMap: false,
        upcMapError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};