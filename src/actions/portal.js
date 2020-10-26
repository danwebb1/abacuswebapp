import {db} from "../config/firebase";


export const REQUEST_PORTAL = "REQUEST_PORTAL";
export const RECEIVE_PORTAL = "RECEIVE_PORTAL";
export const PORTAL_FAILURE = "PORTAL_FAILURE";

const requestPortal= () => {
  return {
    type: REQUEST_PORTAL
  };
};
const receivePortal = portal => {
  return {
    type: RECEIVE_PORTAL,
    portal
  };
};
const portalError = (error) => {
  return {
    type: PORTAL_FAILURE,
    error
  };
};

export const getPortal = (portal) => dispatch => {
    dispatch(requestPortal());
      db.collection('portal')
          .doc(portal)
          .get()
          .then(portal => {
                  dispatch(receivePortal(portal.data()))
                })
            .catch(error => {
                dispatch(portalError(error));
            });
};

