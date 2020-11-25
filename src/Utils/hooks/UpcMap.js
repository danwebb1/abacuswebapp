import {useAuth, useUserProfile} from "./UserAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import MemoryCache from "../../api/storage";
import AbacusAPIClient from "../../api/AbacusAPIClient";
import {
    getSettings,
    receivedUpcMap,
    requestUpcMap,
    upcMapError
} from "../../actions";

export function useUpcMap() {
    const cache = new MemoryCache().enclosure();
    const auth =  useAuth();
    const user =  useUserProfile();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [upcMap, setUpcMap] = useState([]);
    React.useEffect( () => {
        if(auth) {
            if(user && user.portal) {
                if (state.auth.token.i) {
                    dispatch(getSettings(user.portal.id));
                    async function fetchUpcMap(){
                        dispatch(requestUpcMap());
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
                            let response = await AbacusAPIClient.post('/v1/inventory/supply/get_upc_map', data, headers);
                            response = await response;
                            if(response.data){
                                receivedUpcMap(response.data);
                                setUpcMap(response.data)
                            }
                        } catch (err) {
                            dispatch(upcMapError(err));
                        }
                    }fetchUpcMap();
                }
            }
        }
    }, [state.auth.token.i]);
    if(upcMap.upc_map) {
        return upcMap
    }
}