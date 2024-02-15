import { useContext, useState } from "react";
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

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      // Directly use the handle for updates as you might not be able to efficiently map uid to handle
      await updateUserData(form.handle, {
        FullName: form.FullName,
        email: form.email,
        mobile: form.mobile,
        // Do not update the handle
      });
      // Update context to reflect changes
      setContext({ user, userData: { ...userData, ...form } });
      console.log("Profile updated successfully!");
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

  return (
    <div>
      <h1>Profile Information</h1>
      <form>
        <label htmlFor="full-name">Full name: </label>
        <input value={form.FullName} onChange={updateForm("FullName")} type="text" name="full-name" id="full-name" /><br/>
        <br/>
        <label htmlFor="handle">Handle: </label>
        <input value={form.handle} onChange={updateForm("handle")} type="text" name="handle" id="handle" /><br/>
        <br/>
        <label htmlFor="email">Email: </label>
        <input value={form.email} onChange={updateForm("email")} type="text" name="email" id="email" /><br/>
        <br/>
        <label htmlFor="mobile">Mobile: </label>
        <input value={form.mobile} onChange={updateForm("mobile")} type="text" name="mobile" id="mobile" /><br/>
        <br/>
        {/* Add other input fields as needed for additional information*/}

        <Button type="button" onClick={updateProfile}>Update Profile</Button>
        <br/> <br/> <br/>
        <Button onClick={logout}>Logout</Button>
      </form>
    </div>
  );
}