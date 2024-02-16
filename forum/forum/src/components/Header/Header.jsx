import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import { AppContext } from "../../Context/AppContext";
import { useContext } from "react";
import { logoutUser } from "../../services/auth.service";
import "./Header.css";
import wheel from '../../../assets/wheel4.png'

export default function Header() {
  const { user, userData, setContext } = useContext(AppContext);
  const isAdmin = userData?.role === "admin";
  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });
  };

  return (
      <header className="sticky-header">
        <div className="round"> <img src={wheel} className="spin whalf" /></div>
        <NavLink to="/"> <button className="btn btn1">Home</button> </NavLink>
        <NavLink to="/trending"> <button className="btn btn2">Top 10 Trending</button> </NavLink>
        <NavLink to="/latest"> <button className="btn btn1">Top 10 Latest</button> </NavLink>
        <NavLink to="/allposts"> <button className="btn btn2">AllPosts</button> </NavLink>
        { user && <NavLink to="/create-post"> <button className="btn btn1">Create Post</button> </NavLink>} 
        {isAdmin && <NavLink to="/admin"> <button className="btn btn2">Admin</button> </NavLink>}
        {user ? (
        <>
          <NavLink to="/profile-information" className="profile">{`Welcome, ${userData?.handle}`}</NavLink>
        </>
          ) : (
        <>
          <NavLink to="/login"><Button>Login</Button></NavLink>
        </>
        )}

      </header>
  );
}
