import React, {useEffect, useState} from 'react';
import {db, Myfirebase} from "../config/firebase";

const useAuth = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
       async function getUserData() {
           Myfirebase
               .auth()
               .onAuthStateChanged(async userAuth => {
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