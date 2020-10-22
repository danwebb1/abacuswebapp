/**
 * Provide In Memory Caching
 * Cache will not delete an element automatically, but will
 * not allow for retrieval after expiry time and will then delete
 * timeouts could be used to delete automatically, but I leave that for later implementation
 * as it is beyond the scope of provided secure token storage
 */
export default class MemoryCache{
    constructor(){
        /**
         * Keep the functionality private
         * @type {function(): {get(*): (undefined|*), clear(): void, delete(*): void, put(*, *=, *): *}}
         */
        this.enclosure = (function (){
            let _cache = {};
            return{
                /**
                 * Put an element in the cache
                 * @param key: Key for the cache item
                 * @param data: data of concern
                 * @param exSeconds: Expiration Seconds
                 * @return {*}
                 */
                put(key, data, exSeconds){
                    const expireTime = Math.floor(Date.now() / 1000) + exSeconds;
                    _cache[key] = {
                        data: data,
                        expireTime: expireTime
                    };
                    return key;
                },
                /**
                 * Get Element out of the cache, if key is present and expiry has not occured
                 * @param key: Key to get out of cache
                 * @return {*}
                 */
                get(key){
                    const entry = _cache[key];
                    if(!entry){
                        return;
                    }
                    const now = Math.floor(Date.now() / 1000);
                    if(entry.expireTime < now){
                        delete _cache[key];
                        return;
                    }
                    else{
                        return entry.data;
                    }
                },
                /**
                 * Delete and Item from the Cache
                 * @param key: Key to to remove item for
                 */
                delete(key){
                    delete _cache[key];
                },
                /**
                 * Clear the cache completely
                 */
                clear(){
                    _cache = {};
                }
            }
        });
    }
}