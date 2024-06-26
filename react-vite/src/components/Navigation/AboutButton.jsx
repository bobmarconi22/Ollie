import { useState, useEffect, useRef } from "react";

function AboutButton() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
    <>
      <button onClick={toggleMenu} id={"user-menu"}>
        <img
          src="/paw.png"
          alt=""
          style={{ width: "40px", cursor: "pointer" }}
        />
      </button>
      <div className={showMenu ? "about-dropdown" : "about-dropdown-hidden"}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            className="form-title"
            style={{ position: "absolute", top: "10px", left: 0, right: 0 }}
          >
            About
          </h1>
          <img
            src="/me.png"
            className="pfp"
            style={{
              margin: "0 auto",
              marginTop: "100px",
            }}
            alt=""
          />
          <p style={{ textAlign: "center" }}>
            Bob Marconi -- Software Engineer
          </p>
          <p style={{ textAlign: "center" }}>
            Follow or see my other projects below!
          </p>
          <div id="links-div">
            <a
              href="https://www.bobmarconi.com"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/globe-256.png"
                className="link-img"
                alt="bobmarconi.com"
              />
            </a>
            <a
              href="https://github.com/bobmarconi22"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
                className="link-img"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/bobmarconi22/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/linkdin.png" className="link-img" alt="linkdin" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutButton;
