import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { AppContext } from "../../Context/AppContext";
import { loginUser } from "../../services/auth.service";
import phone from "../../../assets/phone.svg";

export default function LoginAdmin() {
  const { admin, setContext } = useContext(AppContext);
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
    if (admin) {
      navigate(location.state?.from.pathname || "/");
    }
  }, [admin]);

  const login = async () => {
    if (!form.mobile || form.mobile.trim() === "") {
      setErrorMsg("You must enter a phone number.");
      return; 
    }

    try {
      const credentials = await loginUser(form.email, form.password);
      // You might need to add additional logic here to verify admin status
      // if your application differentiates between admin and regular users
      setContext({ admin: credentials.user, userData: null }); // Assuming `credentials.user` holds the necessary admin info; adjust as per your implementation
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
          <h1 className="login__title">Login as admin</h1>

          <div className="login__content">
            {errorMsg && <p className="login__error">{errorMsg}</p>}

            {/*Email*/}
            <div className="login__box">
              <i className="ri-user-3-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.email} onChange={updateForm("email")} type="text" id="email" name="email" className="login__input" />
                <label htmlFor="email" className="login__label"> Email:{" "} </label>
              </div>
            </div>

            {/*Password*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                <input value={form.password} onChange={updateForm("password")} type="password" required className="login__input" id="password" name="password" />
                <label htmlFor="password" className="login__label"> {" "}Password:{" "} </label>
                <i className="ri-eye-off-line login__eye" id="login-eye"></i>
              </div>
            </div>
          </div>

            {/*Mobile*/}
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>

              <div className="login__box-input">
                {/* <img src={phone}  /> */}
                <input type="number" placeholder="Phone Number" name="mobile" className="login__input" value={form.mobile} onChange={updateForm("mobile") } required />
              </div>
            </div>

          {/*Remember me*/}
          <div className="login__check">
            <div className="login__check-group">
              <input type="checkbox" className="login__check-input" id="login-check" />
              <label type="login-check" className="login__check-label"> {" "}Remember me{" "} </label>
            </div>
          </div>

          <button onClick={login} className="login__button"> Login </button>

        </div>
      </div>
    </>
  );
}