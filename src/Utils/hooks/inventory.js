import {useAuth, useUserProfile} from "./UserAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {requestInventory, receiveInventory, inventoryError} from "../../actions/inventory";
import MemoryCache from "../../api/storage";
import AbacusAPIClient from "../../api/AbacusAPIClient";

export function useInventory() {
    const cache = new MemoryCache().enclosure();
    const auth =  useAuth();
    const user =  useUserProfile();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [inventory, setInventory] = useState([]);
    React.useEffect( () => {
        if(auth) {
            if(user && user.portal) {
                if (state.auth.token.i) {
                    async function fetchInventory(){
                        dispatch(requestInventory());
                        let authToken;
                        let portal;
                        cache.put('auth-token', JSON.stringify(state.auth.token.i), 100);
                        cache.put('portal', JSON.stringify(user.portal.id), 100);
                        if(cache.get('auth-token')){
                            authToken = "Bearer " + cache.get('auth-token').replace(/["']/g, "");
                            portal = cache.get('portal').replace(/["']/g, "");
                        }
                        const headers = {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': '*',
                                    'Access-Control-Allow-Headers': '*',
                                    'Content-Type': 'application/json',
                                    'Authorization': authToken
                                }
                              };
                        const data = {
                            'portal': portal
                        };
                        try {
                            let response = await AbacusAPIClient.post('/v1/inventory/supply/get_supply', data, headers);
                            response = await response;
                            if(response.data){
                                receiveInventory(response.data);
                                setInventory(response.data)
                            }
                        } catch (err) {
                            dispatch(inventoryError(err));
                        }
                    }fetchInventory();
                }
            }
        }
    }, [state.auth.token.i]);
    if(inventory.supply) {
        return inventory
    }
}