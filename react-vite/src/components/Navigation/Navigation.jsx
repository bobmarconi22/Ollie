import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import AboutButton from "./AboutButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav id="navbar">
      <AboutButton />
      <p id="about-text">About</p>
      <NavLink to="/">
        <img src="/ollie.png" alt="" id="logo" style={{cursor: 'pointer'}}/>
      </NavLink>
      <ProfileButton />
      <p id="menu-text">Menu</p>
    </nav>
  );
}

export default Navigation;
