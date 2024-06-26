import { useContext, useState } from "react";
import { registerUser } from "../../services/auth.service";
import { createUserProfile, getUserByHandle } from "../../services/users.service";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import phone from "../../../assets/phone.svg";

export default function Register() {
  const { setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    FullName: "",
    handle: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "user",
    image: '../../img/default.png',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  function validateDetails(mobile) {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setErrorMessage("Mobile number must be of 10 digits");
      return false;
    }
    return true;
  }

  const register = async () => {
    try {
      if (form.FullName.length < 4 || form.FullName.length > 32) {
        setErrorMessage(
          "First name and last name must be between 4 and 32 symbols."
        );
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(form.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setErrorMessage("Password and Confirm Password do not match");
        return false;
      }

      if (!validateDetails(form.mobile)) {
        setErrorMessage("Mobile number must be of 10 digits");
      }

      const user = await getUserByHandle(form.handle);
      if (user.exists()) {
        setErrorMessage(`Handle @${form.handle} already exists`);
        return;
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserProfile(
        form.FullName,
        form.handle,
        credentials.user.uid,
        form.email,
        form.mobile,
        form.password,
        form.role,
        form.image,
      );

      setContext({ user: credentials.user, userData: null });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use.");
      } else {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
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
            {errorMessage && <p className="login__error">{errorMessage}</p>}

            {/*Full Name*/}
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.FullName} onChange={updateForm("FullName")} type="text" id="full-name" name="full-name" className="login__input" required />
                <label htmlFor="full-name" className="login__label"> Full name:{" "} </label>
              </div>
            </div>

            {/*Handle*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.handle} onChange={updateForm("handle")} type="text" className="login__input" id="handle" name="handle" required />
                <label htmlFor="handle" className="login__label"> {" "}Username:{" "} </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>

            {/*Email*/}
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.email} onChange={updateForm("email")} type="text" id="email" name="email" className="login__input" required />
                <label htmlFor="email" className="login__label"> Email:{" "} </label>
              </div>
            </div>

            {/*Password*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.password} onChange={updateForm("password")} type="password" className="login__input" id="password" name="password" required />
                <label htmlFor="password" className="login__label"> {" "}Password:{" "} </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>

            {/*Confirm Password*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.confirmPassword} onChange={updateForm("confirmPassword")} type="password" className="login__input" id="confirm-password" name="confirm-password" required />
                <label htmlFor="confirm-password" className="login__label"> {" "}Confirm password:{" "} </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

          {/*Mobile*/}
          <div>
            <div >
              <img src={phone} />
            </div>
            <input type="number" placeholder="Phone Number" name="mobile" value={form.mobile} onChange={updateForm("mobile")} />
          </div>
          <br />
          <button onClick={register} className="login__button"> Register </button>
          <br />
          <div className="login__register"> Have an account?{" "} <Link to="/login" style={{ textDecoration: "underline" }}> Login </Link>{" "} </div>
        </div>
      </div>
    </>
  );
}