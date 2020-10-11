import React, {useState} from "react"
import {useSelector, useDispatch} from "react-redux";
import {getNotifications} from "../../actions/notifications";
import {useAuth} from "./UserAuth";
import {db} from "../../config/firebase";

export function useNotifications() {
    const auth = useAuth();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    React.useEffect( () => {
        if(auth) {
            dispatch(getNotifications(auth));
            if (state.notifications.receivedNotifications) {
                setNotifications(state.notifications.notifications);
            }
        }
    }, [state.notifications.receivedNotifications]);
    return notifications
}
export function getMessage(id){
    if (id) {
        const promise = db.collection('user_messages')
            .doc(id)
            .get();
        const messagePromise = promise.then( (message) => {
            let send_read = readMessage(id);
            return message.data();
        });
        return messagePromise;
    }
};

export const readMessage = (id) => {
    if (id) {
        db.collection('user_messages')
            .doc(id)
            .update({read: true})
            .catch(error => {
                return error;
            });
    }
}