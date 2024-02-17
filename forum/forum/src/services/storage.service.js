import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../config/firebase-config";
import { updateUserData } from "./users.service"; // Import the function for updating user data

export const uploadProfilePicture = async (file, userId) => {
  const storage = getStorage();
  const storageReference = storageRef(storage, `profilePictures/${userId}`);

  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateUserData(userId, { image: downloadURL }); // Update user's profile with the image URL
    return downloadURL;
  } catch (error) {
    console.error("Failed to upload profile picture:", error);
    throw error;
  }
};
