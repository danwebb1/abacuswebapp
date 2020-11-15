import {useAuth, useUserProfile} from "./UserAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {requestUpc, receivedUpc, upcError} from "../../actions/upc";
import MemoryCache from "../../api/storage";
import AbacusAPIClient from "../../api/AbacusAPIClient";
import {getSettings} from "../../actions";

export function useUpc() {
    const cache = new MemoryCache().enclosure();
    const auth =  useAuth();
    const user =  useUserProfile();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [upc, setUpc] = useState([]);
    React.useEffect( () => {
        if(auth) {
            if (state.auth.token.i) {
                async function fetchUpc(){
                    dispatch(requestUpc());
                    let authToken;
                    cache.put('auth-token', JSON.stringify(state.auth.token.i), 100);
                    if(cache.get('auth-token')){
                        authToken = "Bearer " + cache.get('auth-token').replace(/["']/g, "");
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
                            'portal': ''
                        };
                        try {
                            let response = await AbacusAPIClient.post('/v1/inventory/supply/get_upc', data, headers);
                            response = await response;
                            if(response.data){
                                receivedUpc(response.data);
                                setUpc(response.data)
                            }
                        } catch (err) {
                            dispatch(upcError(err));
                        }
                    }fetchUpc();
                }
            }
    }, [state.auth.token.i]);
    if(upc.codes) {
        return upc
    }
}