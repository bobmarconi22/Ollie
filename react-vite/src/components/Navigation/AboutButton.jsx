import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AboutButton() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
      <button onClick={() => navigate('/about')} id={"user-menu"}>
        <img
          src="/paw.png"
          alt=""
          style={{ width: "40px", cursor: "pointer" }}
        />
      </button>
  );
}

export default AboutButton;
