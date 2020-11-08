import {db} from "../config/firebase";


export const REQUEST_SETTINGS = "REQUEST_SETTINGS";
export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS";
export const SETTINGS_FAILURE = "SETTINGS_FAILURE";

const requestSettings= () => {
  return {
    type: REQUEST_SETTINGS
  };
};
const receiveSettings = settings => {
  return {
    type: RECEIVE_SETTINGS,
    settings
  };
};
const settingsError = (error) => {
  return {
    type: SETTINGS_FAILURE,
    error
  };
};

export const getSettings = (portal) => dispatch => {
    dispatch(requestSettings());
    const _portal = db.collection('portal').doc(portal);
     db.collection('settings')
          .where("portal", "==", _portal)
          .get()
          .then(querySnapshot => {
                    const settings = [];
                    querySnapshot.forEach(doc => {
                      settings.push({
                        ...doc.data(),
                        id: doc.id,
                        ref: doc.ref
                      });
                  });
                  dispatch(receiveSettings(settings[0]))
           })
            .catch(error => {
                dispatch(settingsError(error));
            });
};

