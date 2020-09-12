import React, {useEffect, useState} from 'react';
import { auth, generateUserDocument } from ".././config/firebase.js";

const useFirebaseAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
       async function getUserData() {
           auth.onAuthStateChanged(async userAuth => {
               const user = await generateUserDocument(userAuth);
               if (user) {
                   setAuthUser(user)
               }
           }
      )}
      getUserData();
    }, []);

    return authUser
};

export default useFirebaseAuthentication;