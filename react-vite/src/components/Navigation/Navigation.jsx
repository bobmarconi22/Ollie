import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "../LandingPage/SearchBar";
import "./Navigation.css";

function Navigation() {
  return (
    <nav id="navbar">
      <NavLink to="/">
        <img src="/ollie.png" alt="" id="logo" />
      </NavLink>
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
