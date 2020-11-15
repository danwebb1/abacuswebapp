import AbacusAPIClient from "./../api/AbacusAPIClient";
import MemoryCache from "./../api/storage";
import React from "react";
import {db} from "../config/firebase";
import {useHistory} from "react-router-dom";

function handleCredentials(token){
    const cache = new MemoryCache().enclosure();
        if(token) {
            cache.put('auth-token', JSON.stringify(token), 100);
            let authToken;
            if (cache.get('auth-token')) {
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
            return headers;
        }
        return '';
}
export async function registerNewApiPortal(portal_id, token){
            const headers = handleCredentials(token);
            const data = {
                'portal': portal_id
            };
            AbacusAPIClient.post('/v1/inventory/auth/create_portal', data, headers).then(res =>{
                AbacusAPIClient.post('/v1/inventory/auth/create_inventory', data, headers);
            });
}
export async function submitInitialInventory(portal_id, token, payload){
        const headers = handleCredentials(token);
            const data = {
                'portal': portal_id,
                'inventory': payload
            };
            AbacusAPIClient.post('/v1/inventory/supply/set_initial_inventory', data, headers).then(res =>{
                if (res.status === 200) {
                    const portal = db.collection('portal').doc(data.portal);
                    portal.update({
                        inventorySetUp: true
                    })
                }
            });

}

export async function submitUpc(portal_id, token, payload){
        const headers = handleCredentials(token);
            const data = {
                'portal': portal_id,
                'upc_list': payload
            };
            AbacusAPIClient.post('/v1/inventory/supply/submit_upc', data, headers).then(res =>{
                if (res.status === 200) {

                }
            });

}