export const REQUEST_INVENTORY = "REQUEST_INVENTORY";
export const RECEIVE_INVENTORY = "RECEIVE_INVENTORY";
export const INVENTORY_FAILURE = "INVENTORY_FAILURE";

export const requestInventory = () => {
  return {
    type: REQUEST_INVENTORY
  };
};
export const receiveInventory = inventory => {
  return {
    type: RECEIVE_INVENTORY,
    inventory
  };
};
export const inventoryError = (error) => {
  return {
    type: INVENTORY_FAILURE,
    error
  };
};
