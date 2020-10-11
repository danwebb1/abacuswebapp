import {db} from "../config/firebase";


export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS";
export const NOTIFICATIONS_FAILURE = "NOTIFICATIONS_FAILURE";

const requestNotification = () => {
  return {
    type: REQUEST_NOTIFICATIONS
  };
};
const receiveNotification = notifications => {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications
  };
};
const notificationError = (error) => {
  return {
    type: NOTIFICATIONS_FAILURE,
    error
  };
};

export const getNotifications = (user) => dispatch => {
      dispatch(requestNotification());
      const notifications = db.collection('user_messages')
          .where("user", "==", db.collection('users').doc(user))
          .get()
           .then(querySnapshot => {
                const notifications = [];
                querySnapshot.forEach(doc => {
                  notifications.push({
                    ...doc.data(),
                    id: doc.id,
                    ref: doc.ref
                  });
                  dispatch(receiveNotification(notifications))
                });
              })
            .catch(error => {
                dispatch(notificationError(error));
            });
};

