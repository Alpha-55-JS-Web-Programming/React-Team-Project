import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(firstandlast, auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(firstandlast, auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};