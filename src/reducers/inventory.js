import {
    REQUEST_INVENTORY,
    RECEIVE_INVENTORY,
    INVENTORY_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingInventory: false,
    inventoryError: false,
    receivedInventory: false,
    inventory: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_INVENTORY:
      return {
        ...state,
        isGettingInventory: true,
        inventoryError: false,
      };
    case RECEIVE_INVENTORY:
      return {
        ...state,
        isGettingInventory: false,
        receivedInventory: true,
        inventory: action.inventory
      };
    case INVENTORY_FAILURE:
      return {
        ...state,
        isGettingInventory: false,
        receivedInventory: false,
        inventoryError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};