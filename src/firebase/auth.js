import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { createUsersInCollection } from "./users";

export const signup = async (firstName, lastName, email, password) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const user = resp.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUsersInCollection(user);
  return user;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async (email, password) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return resp.user;
};

export const signInWithGoogle = async () => {
  const resp = await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());

  console.log("Res Google : " + JSON.stringify(resp));
  createUsersInCollection(resp.user);
  return resp;
};
