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
        <NavLink to="/"> <Button>Home</Button> </NavLink>
        <NavLink to="/trending"> <Button>Top 10 Trending</Button> </NavLink>
        <NavLink to="/latest"> <Button>Top 10 Latest</Button> </NavLink>
        <NavLink to="/allposts"> <Button>AllPosts</Button> </NavLink>
        { user && <NavLink to="/create-post"> <Button>Create Post</Button> </NavLink>} 
        {isAdmin && <NavLink to="/admin"> <Button>Admin</Button> </NavLink>}
        {user ? (
        <>
          <NavLink to="/profile-information" className={"profile"}>{`Welcome, ${userData?.handle}`}</NavLink>
        </>
          ) : (
        <>
          <NavLink to="/login"><Button>Login</Button></NavLink>
        </>
        )}

      </header>
  );
}
