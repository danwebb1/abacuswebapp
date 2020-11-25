export const REQUEST_UPC_LIST = "REQUEST_UPC_LIST";
export const RECEIVED_UPC_LIST = "RECEIVE_UPC_LIST";
export const UPC_LIST_FAILURE = "UPC_LIST_FAILURE";

export const requestUpcList = () => {
  return {
    type: REQUEST_UPC_LIST
  };
};
export const receivedUpcList = upc_list => {
  return {
    type: RECEIVED_UPC_LIST,
    upc_list
  };
};
export const upcListError = (error) => {
  return {
    type: UPC_LIST_FAILURE,
    error
  };
};
