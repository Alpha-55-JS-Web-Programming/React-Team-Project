import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserData } from "./users.service";

export const uploadProfilePicture = async (file, userId) => {
  const storage = getStorage();
  const storageReference = storageRef(storage, `profilePictures/${userId}`);

  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateUserData(userId, { image: downloadURL });
    return downloadURL;
  } catch (error) {
    console.error("Failed to upload profile picture:", error);
    throw error;
  }
};
