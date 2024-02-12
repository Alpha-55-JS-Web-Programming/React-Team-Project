import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByHandle } from "../../services/users.service";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FullName: "",
    handle: "",
    email: "",
    password: "",
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const updateForm = prop => e => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    // TODO: Validate inputs
    try {
      if (form.FullName.length < 4 || form.FullName.length > 32) {
        setErrorMessage("First name and last name must be between 4 and 32 symbols.");
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        setErrorMessage(`Handle @${form.handle} already exists`);
        return;
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(
        form.FullName,
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
    <>
      <div className="login">
        <div action="" className="login__form">
          <h1 className="login__title">Register</h1>
    
          <div className="login__content">
            {/* {errorMsg && <p className="login__error">{errorMsg}</p>} */}

          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input value={form.FullName} onChange={updateForm("FullName")} type="text" id="full-name" name="full-name" className="login__input" />
              <label htmlFor="full-name" className="login__label">Full name: </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input value={form.handle} onChange={updateForm("handle")} type="text" required className="login__input" id="handle" name="handle" />
              <label htmlFor="handle" className="login__label"> Handle: </label>
              <i className="ri-eye-off-line login__eye" id="login-eye"></i>
            </div>
          </div>

    
            <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input value={form.email} onChange={updateForm("email")} type="text" id="email" name="email" className="login__input" />
              <label htmlFor="email" className="login__label">Email: </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input value={form.password} onChange={updateForm("password")} type="text" required className="login__input" id="password" name="password" />
              <label htmlFor="password" className="login__label"> Password: </label>
              <i className="ri-eye-off-line login__eye" id="login-eye"></i>
            </div>
          </div>
        </div>
    
          <button onClick={register} className="login__button">Register</button><br/>
          <p className="login__register">Have an account?{" "}<Link to="/login" style={{ textDecoration: "underline" }}>Login</Link>{" "}</p>
      </div>
    </div>
    </>
    );
}

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <label htmlFor="full-name">Full name: </label><input value={form.FullName} onChange={updateForm('FullName')} type="text" name="full-name" id="full-name" /><br/>
  //     <label htmlFor="handle">Handle: </label><input value={form.handle} onChange={updateForm('handle')} type="text" name="handle" id="handle" /><br/>
  //     <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
  //     <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /><br/><br/>
  //     <Button onClick={register}>Register</Button>
  //     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  //   </div>
  // )