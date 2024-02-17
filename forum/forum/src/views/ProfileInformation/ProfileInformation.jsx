import React, { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { logoutUser } from "../../services/auth.service";
import Button from "../../components/Button/Button";
import { updateUserData } from "../../services/users.service";

export default function ProfileInformation() {
  const { user, userData, setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FullName: userData?.FullName || "",
    handle: userData?.handle || "",
    email: userData?.email || "",
    mobile: userData?.mobile || "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track whether in edit mode
  const [messages, setMessages] = useState([]);

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUserData(form.handle, {
        FullName: form.FullName,
        email: form.email,
        mobile: form.mobile,
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

  return (
    <div>
      <h1>Profile Information</h1>

      {/* Display profile information by default */}
      {!isEditing && (
        <div>
          <p><strong>Full name:</strong> {userData.FullName}</p>
          <p><strong>Handle:</strong> {userData.handle}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Mobile:</strong> {userData.mobile}</p>
        </div>
      )}

      {/* Conditionally render edit view when in edit mode */}
      {isEditing ? (
        <form>
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