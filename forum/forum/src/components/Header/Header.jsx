import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import "./Header.css";

export function Header() {
  return (
    <>
      <header className="sticky-header">
        <NavLink to="/"> <Button>Home</Button> </NavLink>
        <NavLink to="/trending"> <Button>Top 10 Trending</Button> </NavLink>
        <NavLink to="/latest"> <Button>Top 10 Latest</Button> </NavLink>

        {/* <NavLink to='/login'><Button>Logout</Button></NavLink> */}
        {/* <Autenticate> <NavLink to='/create-post'><Button>Create Post</Button></NavLink></Autenticate> */}
        <NavLink to="/create-post"> <Button>Create Post</Button> </NavLink>

        <NavLink to="/register"> <Button>Register</Button> </NavLink>
        <NavLink to="/login"> <Button>Login</Button> </NavLink>
      </header>
    </>
  );
}
