import {
    REQUEST_UPC_LIST,
    RECEIVED_UPC_LIST,
    UPC_LIST_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingUpcList: false,
    upcListError: false,
    receivedUpcList: false,
    upc_list: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_UPC_LIST:
      return {
        ...state,
        isGettingUpcList: true,
        upcListError: false,
      };
    case RECEIVED_UPC_LIST:
      return {
        ...state,
        isGettingUpcList: false,
        receivedUpcList: true,
        upc: action.upc_list
      };
    case UPC_LIST_FAILURE:
      return {
        ...state,
        isGettingUpcList: false,
        receivedUpcList: false,
        upcListError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};