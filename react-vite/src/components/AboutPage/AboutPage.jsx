import "./AboutPage.css";

function AboutPage() {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        className="form-title"
        style={{ position: "absolute", top: "120px", left: 0, right: 0 }}
      >
        About
      </h1>
      <img
        src="/me.png"
        className="pfp"
        style={{
          margin: "0 auto",
          marginTop: "220px",
        }}
        alt=""
      />
      <p style={{ textAlign: "center" }}>Bob Marconi -- Software Engineer</p>
      <p style={{ textAlign: "center" }}>
        Follow or see my other projects below!
      </p>
      <div id="links-div">
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
          href="https://www.facebook.com/Bobmarconi22/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn3.iconfinder.com/data/icons/remixicon-logos/24/facebook-circle-line-512.png"
            className="link-img"
            alt="facebook"
          />
        </a>
        <a href="mailto:bobmarconi22@gmail.com">
          <img
            src="https://cdn1.iconfinder.com/data/icons/ionicons-sharp-vol-1/512/at-sharp-512.png"
            className="link-img"
            alt="email"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/bob-marconi-3656932a9/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/linkdin.png" className="link-img" alt="linkdin" />
        </a>
      </div>
    </div>
  );
}

export default AboutPage;
