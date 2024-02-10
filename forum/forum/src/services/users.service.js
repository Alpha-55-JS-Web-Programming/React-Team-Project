import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (handle = 'pesho') => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (firstandlast, handle, uid, email) => {

  return set(ref(db, `users/${handle}`), {firstandlast, handle, uid, email, createdOn: new Date().valueOf(), likedTweets: {} })
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};
