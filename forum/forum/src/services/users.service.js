import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';

export const getUserByHandle = (handle = 'pesho') => {
  return get(ref(db, `users/${handle}`));
};


export const createUserProfile = (FullName, handle, uid, email, mobile, password, role = 'user') => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return set(ref(db, `users/${handle}`), {
    FullName,
    handle,
    uid,
    email,
    mobile,
    password, // Make sure password is stored in the correct field
    createdOnReadable: readableDate,
    isBlocked: false,
    role,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserData = async (handle, data) => {
  const userRef = ref(db, `users/${handle}`); // Use handle to reference the correct path

  try {
    await update(userRef, data);
    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserRole = async (uid, newRole) => {
  return update(ref(db, `users/${uid}`), { role: newRole });
};

export const getUsersCount = async () => {
  const snapshot = await get(query(ref(db, 'users')));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};


// DONT DELETE THIS CODE:
// export const createUserHandle = (FullName, handle, uid, email) => {

//   return set(ref(db, `users/${handle}`), {FullName, handle, uid, email, createdOn: new Date().valueOf(), likedTweets: {} })
// };