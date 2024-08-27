function AboutPage() {
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '90%', margin: '150px auto' }}>
       <h1
            className="form-title"
            style={{ position: "absolute", top: "10px", left: 0, right: 0 }}
          >
            About
          </h1>
          <img
            src="/me.png"
            className="pfp about-pfp"
            style={{
              margin: "0 auto",
              marginTop: "20px",
            }}
            alt=""
          />
          <p style={{ textAlign: "center" }}>
            Bob Marconi -- Software Engineer
          </p>
          <p style={{ textAlign: "center" }}>
            Follow me or see my other projects below!
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
  );
}

export default AboutPage;
