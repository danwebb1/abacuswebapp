import axios from 'axios';
const regeneratorRuntime = require("regenerator-runtime"); //This is needed for requestRefresh
/**
 * API client for interacting with Abacus API
 * @type {AxiosInstance}
 */
const API =  axios.create({
    baseURL: process.env.REACT_APP_API_BASE
});
class AbacusAuthClient{

    constructor(api){
        this.api = api;
        this.api.interceptors.request.use(async (config) => {
            return config;
        });
    }
}
const authClient = new AbacusAuthClient(API);
export {authClient}
export default API;