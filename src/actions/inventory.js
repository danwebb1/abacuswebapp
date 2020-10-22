import AbacusAPIClient from "../api/AbacusAPIClient";
import MemoryCache from "../api/storage";

export const REQUEST_INVENTORY = "REQUEST_INVENTORY";
export const RECEIVE_INVENTORY = "RECEIVE_INVENTORY";
export const INVENTORY_FAILURE = "INVENTORY_FAILURE";

const requestInventory = () => {
  return {
    type: REQUEST_INVENTORY
  };
};
const receiveInventory = inventory => {
  return {
    type: RECEIVE_INVENTORY,
    inventory
  };
};
const inventoryError = (error) => {
  return {
    type: INVENTORY_FAILURE,
    error
  };
};

export const getInventory= (token) => dispatch => {
      dispatch(requestInventory());
      let authToken;
      let cache = new MemoryCache().enclosure();
      if(token.i) {
          cache.put('auth-token', JSON.stringify(token.i), 999999);
      }
      if(cache.get('auth-token')){
            authToken = "Bearer " + cache.get('auth-token').replace(/["']/g, "");
      }
      console.log(authToken)
      const headers = {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': '*',
                  'Access-Control-Allow-Headers': '*',
                  'Content-Type': 'application/json',
                  'Authorization': authToken
              };
      AbacusAPIClient.get('/v1/inventory/inv', {headers} ).then(res => {
           receiveInventory(res.data)
          }
      );

};

