import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { logoutUser } from "../../services/auth.service";
import Button from "../../components/Button/Button";

export default function ProfileInformation() {
  const { user, userData, setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FullName: userData?.FullName || "",
    handle: userData?.handle || "",
    // Add other fields as needed
  });

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      // Validate inputs if needed

      // Update user handle
      await updateUserData(form.FullName, form.handle, user.uid);

      // Update context to reflect changes
      setContext({ user, userData: { ...userData, FullName: form.FullName, handle: form.handle } });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setContext({ user: null, userData: null });
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
        {/* Add other input fields as needed for additional information */}
        
        <Button type="button" onClick={updateProfile}>Update Profile</Button>
        <br/> <br/> <br/>
        <Button onClick={logout}>Logout</Button>
      </form>
    </div>
  );
}