import React, { createContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../configs";
import {updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const createUser = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        //update display name
        await updateProfile(res.user,{
          displayName: name,
        });
      }
    );
  };
  const logout = () => {
    return signOut(auth);
  };
  const signIn = (email, password, usr) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const googleSignUp = (name) => {
    const provider = new GoogleAuthProvider();
    if (name !== "") {
      return signInWithPopup(auth, provider).then(async (res) => {
        //update display name
        await res.user.updateProfile({
          displayName: name,
        });
      });
    }
  
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log(currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, googleSignIn, googleSignUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return React.useContext(UserContext);
};
