import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { logoutUser } from "../../services/auth.service";
import Button from "../../components/Button/Button";
import { updateUserData } from "../../services/users.service";
import  img  from '../../img/default.png';
import { uploadProfilePicture } from "../../services/storage.service";


export default function ProfileInformation() {
  const { user, userData, setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FullName: userData?.FullName || "",
    handle: userData?.handle || "",
    email: userData?.email || "",
    mobile: userData?.mobile || "",
    image: userData?.image || img,
  });
  const [isEditing, setIsEditing] = useState(false); // Track whether in edit mode
  const [messages, setMessages] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setForm({ ...form, image: storedImage });
    }
  }, []);
  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      // Upload image file if selected
      if (imageFile) {
        // const formData = new FormData();
        // formData.append("image", imageFile);
        // const uploadedImage = await uploadImage(formData);
        // setForm({ ...form, image: uploadedImage });
        await updateUserData(form.handle, {
          FullName: form.FullName,
          email: form.email,
          mobile: form.mobile,
          image: form.image,
        });
      }
      await updateUserData(form.handle, {
        FullName: form.FullName,
        email: form.email,
        mobile: form.mobile,
        image: form.image,
      });

      setContext({ user, userData: { ...userData, ...form } });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }

    let newMessages = [];
    try {
      if (form.FullName !== userData.FullName) {
        newMessages.push("Your names were updated successfully!");
      }
      if (form.email !== userData.email) {
        newMessages.push("Your email was updated successfully!");
      }
      if (form.mobile !== userData.mobile) {
        newMessages.push("Your mobile number was updated successfully!");
      }
      if (form.handle !== userData.handle) {
        newMessages.push("You are not allowed to update your username!");
      }

      setMessages(newMessages);
      setIsEditing(false); // Exit edit mode after updating
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setContext({ user: null, userData: null });
      console.log("Logout successful!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const enterEditMode = () => {
    setIsEditing(true);
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0]; // Get the file from the event
  //   if (!file) return;

  //   try {
  //     const downloadURL = await uploadProfilePicture(file, userData.uid); // Assuming `uid` is available in userData
  //     setForm({ ...form, image: downloadURL }); // Update the local form state with the new image URL
  //   } catch (error) {
  //     console.error("Error uploading file:", error.message);
  //   }
  // };

  return (
    <div>
      <h1>Profile Information</h1>

      {/* Display profile information by default */}
      {!isEditing && (
        <div>
          <img src={form.image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p><strong>Full name:</strong> {userData.FullName}</p>
          <p><strong>Handle:</strong> {userData.handle}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
        </div>
      )}

      {/* Conditionally render edit view when in edit mode */}
      {isEditing ? (
        <form>
          <label htmlFor="image">Image: </label>
          <input onChange={handleFileChange} type="file" accept="image/*" name="image" id="image" />
          <br />
          <label htmlFor="full-name">Full name: </label>
          <input value={form.FullName} onChange={updateForm("FullName")} type="text" name="full-name" id="full-name" /><br />
          <br />
          <label htmlFor="handle">Handle: </label>
          <input value={form.handle} onChange={updateForm("handle")} type="text" name="handle" id="handle" /><br />
          <br />
          <label htmlFor="email">Email: </label>
          <input value={form.email} onChange={updateForm("email")} type="text" name="email" id="email" /><br />
          <br />
          <label htmlFor="mobile">Mobile: </label>
          <input value={form.mobile} onChange={updateForm("mobile")} type="text" name="mobile" id="mobile" /><br />
          <br />
          <Button type="button" onClick={(e) => updateProfile(e)}>Update Profile</Button>
        </form>
      ) : (
        <Button type="button" onClick={enterEditMode}>Edit Profile</Button>
      )}

      {messages.map((message, index) => (
        <div key={index} style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
          {message}
        </div>
      ))}
      <br /> <br /> <br />
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}