import AbacusAPIClient from "./../api/AbacusAPIClient";
import MemoryCache from "./../api/storage";
import React from "react";
import {db} from "../config/firebase";

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
export const submitInitialInventory = async (portal_id, token, payload) => {
        const headers = handleCredentials(token);
            const data = {
                'portal': portal_id,
                'inventory': payload
            };
            let submit = await AbacusAPIClient.post('/v1/inventory/supply/set_initial_inventory', data, headers);
            if (submit.status === 200){
                const portal = db.collection('portal').doc(data.portal);
                portal.update({
                    inventorySetUp: true
                });
                if(localStorage.getItem('abacusInventory')) {
                        localStorage.removeItem('abacusInventory')
                }
                return submit
            }else{
                return 'error'
            }


}

export const submitUpc = async (portal_id, token, payload) =>{
        const headers = handleCredentials(token);
            const data = {
                'portal': portal_id,
                'upc_list': payload
            };
            let submit = await AbacusAPIClient.post('/v1/inventory/supply/submit_upc', data, headers);
                if (submit.status === 200) {
                    if(localStorage.getItem('abacusInventory')) {
                        localStorage.removeItem('abacusInventory');
                    }
                    return submit
                }else{
                    return 'error'
                }
}

export const submitUpcMap = async (portal_id, token, payload, method) =>{

        const headers = handleCredentials(token);
            const data = {
                'portal': portal_id,
                'map_list': payload,
                'method': method
            };
            if(method === 'post') {
                let save = await AbacusAPIClient.post('/v1/inventory/supply/submit_upc_map', data, headers);
                if(save.status === 200) {
                    if (localStorage.getItem('abacusUpcMap')) {
                            localStorage.removeItem('abacusUpcMap')
                        }

                    const portal = db.collection('portal').doc(data.portal);
                    portal.update({
                        upcMapComplete: true
                    });
                    return save
                }else{
                    return 'error'
                }
            }
            if(method === 'put') {
                let update = await AbacusAPIClient.put('/v1/inventory/supply/update_upc_map', data, headers);
                if(update.status === 200) {
                    if (localStorage.getItem('abacusUpcMap')) {
                            localStorage.removeItem('abacusUpcMap')
                        }
                    return update
                }else{
                    return 'error'
                }
            }

};