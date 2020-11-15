export const REQUEST_UPC = "REQUEST_UPC";
export const RECEIVED_UPC = "RECEIVE_UPC";
export const UPC_FAILURE = "UPC_FAILURE";

export const requestUpc = () => {
  return {
    type: REQUEST_UPC
  };
};
export const receivedUpc = upc => {
  return {
    type: RECEIVED_UPC,
    upc
  };
};
export const upcError = (error) => {
  return {
    type: UPC_FAILURE,
    error
  };
};
