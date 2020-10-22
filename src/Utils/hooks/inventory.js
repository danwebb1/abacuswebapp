import {useAuth} from "./UserAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {getInventory} from "../../actions/inventory";

export function useInventory() {
    const auth = useAuth();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [inventory, setInventory] = useState([]);
    React.useEffect( () => {
        if(auth) {
            if(state.auth.token.i) {
                dispatch(getInventory(state.auth.token));
                if (state.inventory.receivedInventory) {
                    setInventory(state.inventory.inventory);
                }
            }
        }
    }, [state.auth.token.i]);
    return inventory
}