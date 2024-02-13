import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { AppContext } from "../../Context/AppContext";
import { loginUser } from "../../services/auth.service";
import "./Login.css";

export default function Login() {
  const { user, setContext } = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
    setErrorMsg("");
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [user]);

  const login = async () => {
    try {
      const credentials = await loginUser(form.email, form.password);
      setContext({ user: credentials.user, userData: null });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setErrorMsg("The email or/and password you entered is/are incorrect. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <div action="" className="login__form">
          <h1 className="login__title">Login</h1>

          <div className="login__content">
            {errorMsg && <p className="login__error">{errorMsg}</p>}

            {/*Email*/}
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.email} onChange={updateForm("email")} type="text" id="email" name="email" className="login__input" required/>
                <label htmlFor="email" className="login__label"> Email:{" "} </label>
              </div>
            </div>

            {/*Password*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.password} onChange={updateForm("password")} type="text" className="login__input" id="password" name="password" required/>
                <label htmlFor="password" className="login__label"> {" "}Password:{" "} </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

          {/*Remember me*/}
          <div className="login__check">
            <div className="login__check-group">
              <input type="checkbox" className="login__check-input" id="login-check" />
              <label type="login-check" className="login__check-label"> {" "}Remember me{" "} </label>
            </div>

            <a href="#" className="login__forgot"> Forgot Password? </a>
          </div>

          <button onClick={login} className="login__button"> Login </button>
          <p className="login__register"> Don't have an account?{" "} <Link to="/register" style={{ textDecoration: "underline" }}> Register </Link>{" "} </p>
        </div>
      </div>
    </>
  );
}

// <div class="login__form">
//   <h1 class="login__title">Login</h1>
//   <div class="login__box-input">
//     <input value={form.email} onChange={updateForm("email") } type="text" id="email" name="email" class="login__input" />
//     <label htmlFor="email" class="login__label">Email: </label>
//   </div>
//   <label htmlFor="password" >Password: </label>
//   <input value={form.password} onChange={updateForm("password")} type="text" id="password" name="password"/>
//   <br /><br />
//   <Button onClick={login}>Login</Button>
//   <p>Click{" "}<Link to="/register" style={{ textDecoration: "underline" }}>here</Link>{" "}if you don't have a registration.</p>
// </div>
