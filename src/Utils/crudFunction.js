import AbacusAPIClient from "./../api/AbacusAPIClient";
import MemoryCache from "./../api/storage";
import React from "react";

export async function registerNewApiPortal(portal_id, token){
        const cache = new MemoryCache().enclosure();
        if(token){
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
            const data = {
                'portal': portal_id
            };
            let response = await AbacusAPIClient.post('/v1/inventory/auth/create_portal', data, headers);
            response = await response;
            return response;
        }
}