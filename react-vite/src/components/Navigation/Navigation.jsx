import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import "./Navigation.css";

function Navigation() {
  return (
    <nav id="navbar">
        <NavLink to="/"><img src="/ollie.png" alt="" id="logo" /></NavLink>
        <SearchBar />
        <ProfileButton />
    </nav>
  );
}

export default Navigation;
