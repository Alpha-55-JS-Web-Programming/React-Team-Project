import { useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByHandle } from "../../services/users.service";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    username: '',
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
      const user = await getUserByHandle(form.username);
      if (user.exists()) {
        console.log(user.val());
        return console.log(`Handle @${form.username} already exists`);
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credentials.user.uid, form.email, form.password);

      setContext({ user, userData: null });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="username">Username: </label><input value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" /><br/>
      <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
      <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /><br/><br/>
      <Button onClick={register}>Register</Button>
    </div>
  )
}