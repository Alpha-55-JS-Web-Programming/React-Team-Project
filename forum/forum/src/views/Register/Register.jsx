import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByHandle } from "../../services/users.service";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FirstAndLast: '',
    handle: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const updateForm = prop => e => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    // TODO: Validate inputs
    try {
      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        console.log(user.val());
        return console.log(`Handle @${form.handle} already exists`);
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.FirstAndLast, form.handle, credentials.user.uid, form.email);

      setContext({ user, userData: null });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="first-and-last-name">First name and last name: </label><input value={form.FirstAndLast} onChange={updateForm('FirstAndLast')} type="text" name="first-and-last-name" id="first-and-last-name" /><br/>
      <label htmlFor="handle">Handle: </label><input value={form.handle} onChange={updateForm('handle')} type="text" name="handle" id="handle" /><br/>
      <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
      <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /><br/><br/>
      <Button onClick={register}>Register</Button>
    </div>
  )
}