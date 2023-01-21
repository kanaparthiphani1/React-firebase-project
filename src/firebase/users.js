import { firestore } from "./config.js";

export const createUsersInCollection = (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);

  const userProf = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    phone: "",
    city: "",
    state: "",
  };

  return docRef.set(userProf);
};
