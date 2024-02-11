import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';

export const getUserByHandle = (handle = 'pesho') => {

  return get(ref(db, `users/${handle}`));
};

// DONT DELETE THIS CODE:
// export const createUserHandle = (FullName, handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), {FullName, handle, uid, email, createdOn: new Date().valueOf(), likedTweets: {} })
// };

export const createUserHandle = (FullName, handle, uid, email) => {
  const timestamp = new Date().valueOf();
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  
  return set(ref(db, `users/${handle}`), {
    FullName,
    handle,
    uid,
    email,
    createdOn: timestamp,
    createdOnReadable: readableDate,
  })
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};
