import {
    REQUEST_NOTIFICATIONS,
    RECEIVE_NOTIFICATIONS,
    NOTIFICATIONS_FAILURE,
} from "../actions/";

export default (
  state = {
    isGettingNotifications: false,
    notificationsError: false,
    receivedNotifications: false,
    notifications: {},
    errors:{}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isGettingNotifications: true,
        notificationsError: false,
      };
    case RECEIVE_NOTIFICATIONS:
      return {
        ...state,
        isGettingNotifications: false,
        receivedNotifications: true,
        notifications: action.notifications
      };
    case NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isGettingNotifications: false,
        receivedNotifications: false,
        notificationsError: true,
        errors: action.errors
      };
    default:
      return state;
  }
};