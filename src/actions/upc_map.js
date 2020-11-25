export const REQUEST_UPC_MAP = "REQUEST_UPC_MAP";
export const RECEIVED_UPC_MAP = "RECEIVED_UPC_MAP";
export const UPC_MAP_FAILURE = "UPC_MAP_FAILURE";

export const requestUpcMap = () => {
  return {
    type: REQUEST_UPC_MAP
  };
};
export const receivedUpcMap = upc_map => {
  return {
    type: RECEIVED_UPC_MAP,
    upc_map
  };
};
export const upcMapError = (error) => {
  return {
    type: UPC_MAP_FAILURE,
    error
  };
};
