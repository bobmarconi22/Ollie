import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav id="navbar">
      <button id="about-button" onClick={() => navigate('/about')}></button>
      <p id="about-text">About</p>
      <NavLink to="/">
        <img src="/ollie.png" alt="" id="logo" />
      </NavLink>
      <ProfileButton />
      <p id="menu-text">Menu</p>

    </nav>
  );
}

export default Navigation;
