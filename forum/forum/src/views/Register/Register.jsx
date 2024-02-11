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

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const updateForm = prop => e => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    // TODO: Validate inputs
    try {
      // Validate inputs
      if (form.FirstAndLast.length < 4 || form.FirstAndLast.length > 32) {
        setErrorMessage("First name and last name must be between 4 and 32 symbols.");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      // TODO: Check if the email is already registered

      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        // console.log(user.val());
        setErrorMessage(`Handle @${form.handle} already exists`);
        return;
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.FirstAndLast,
        form.handle,
        credentials.user.uid,
        form.email
      );

      setContext({ user: credentials.user, userData: null });
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use.');
      } else {
        setErrorMessage('An error occurred during registration. Please try again.');
      }
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}