import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';

export const getUserByHandle = (handle = 'pesho') => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (FullName, handle, uid, email) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  
  return set(ref(db, `users/${handle}`), {
    FullName,
    handle,
    uid,
    email,
    createdOnReadable: readableDate,
  })
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserData = async (FullName, newHandle, uid, oldHandle = null) => {
  const userRef = ref(db, `users/${oldHandle || newHandle}`);
  const updates = {};
  updates['/FullName'] = FullName;

  try {
    await update(userRef, updates);
    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};




// DONT DELETE THIS CODE:
// export const createUserHandle = (FullName, handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), {FullName, handle, uid, email, createdOn: new Date().valueOf(), likedTweets: {} })
// };