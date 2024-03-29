import {db, Myfirebase, time} from "../config/firebase";
import {registerNewApiPortal} from "../Utils/crudFunction";
import {logoutUser} from "./auth";
import {useDispatch} from "react-redux";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

const requestSignUp = () => {
  return {
    type: SIGNUP_REQUEST
  };
};
const receiveSignUp = new_user => {

  return {
    type: SIGNUP_SUCCESS,
    new_user
  };
};
const SignUpError = (error) => {
  return {
    type: SIGNUP_FAILURE,
      error
  };
};


export const SignUpUser = (userObject) => dispatch => {
  dispatch(requestSignUp());
  Myfirebase
    .auth()
    .createUserWithEmailAndPassword(userObject.email, userObject.password)
    .then(user => {
      userObject.uid = user.user.uid;
      const user_auth = user.user.getIdToken();
      delete userObject.password;
      delete userObject.password2;
      userObject.role = 'admin';
      userObject.setUp = false;
      dispatch(receiveSignUp(userObject));
      db.collection('users')
          .doc(userObject.uid)
          .set(userObject).then(res => {
                createNewPortal(userObject, user_auth);
            });
    })
    .catch(error => {
      dispatch(SignUpError(error));
    });
};

async function createNewPortal(userObject, user_auth) {
    const products_ref = db.collection('products').doc('VLZoWE00o2zga4MQQcYa');
    const ref = db.collection('users').doc(userObject.uid);
    let portal = await db.collection('portal').add({
        admins: [ref],
        display_name:'',
        email: userObject.email,
        phone: userObject.phone
    });
    let portal_ref = db.collection('portal').doc(portal.id);
    let settings = await db.collection('settings').add({
        portal: portal_ref,
        products: [products_ref],
        integration: "",
        inventorySetUp: false,
        upcMapComplete: false,
        userAddMappings: false,
        userAddUsers: false,
        userInventoryUpdate: false,
        userViewSettings: false,
        inventoryAlertAmount: 0
    });
    settings = await settings.update({portal: portal_ref});
    const _ref = await ref.update({portal: portal_ref});
    return registerNewApiPortal(portal.id, user_auth.i)

}

export const welcome_notification = (user_ref) => {
     let welcome_message = db.collection('user_messages').add({
        date: time.serverTimestamp(),
        from: 'Abacus Support Team',
        message: `Welcome to Abacus Dental Inventory Management System! We're glad you've trusted Abacus with your businesses'
        inventory management needs. We will be continually adding features and improving Abacus to help you navigate the fast paced, and
        ever changing world of technology. If you have any questions, suggestions, or frustrations, please don't hesitate to contact us!`,
        read: false,
        subject: "Welcome!",
        user: user_ref
    });
};