import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(
    "https://marconi22-ollie.s3.us-east-2.amazonaws.com/4dead4e64d8e410bb7e0b8050a34f38c.png"
  );
  const [imageLoading, setImageLoading] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSitter, setIsSitter] = useState(false);
  const [overnight, setOvernight] = useState(false);
  const [atHome, setAtHome] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = {};

    if (password.length > 8) {
      err.password = "Password must be 8 characters";
    }
    if (username.includes(" ")) {
      err.username = "Username cannot contain spaces";
    }
    if (firstName.includes(" ")) {
      err.firstName = "First Name cannot contain spaces";
    }
    if (lastName.includes(" ")) {
      err.lastName = "Last Name cannot contain spaces";
    }
    setErrors(err);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    if (Object.keys(errors).length !== 0) {
      const formData = new FormData();
      formData.append("profile_pic", image);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("sitter", isSitter);
      formData.append("at_home", atHome);
      formData.append("overnight", overnight);
      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      setImageLoading(true);
      const serverResponse = await dispatch(thunkSignup(formData));

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <img src={imagePreview} alt="Pet" className="form-pic" />
        <label>
          <input
            type="file"
            accept="image/*"
            className="choose-file"
            onChange={handleImageChange}
          />
        </label>
        <div className="form">
          <input
            type="email"
            value={email}
            id={"email"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for={"email"} className="form__label">
            Email
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            value={username}
            id={"username"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label for={"username"} className="form__label">
            Username
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            value={phone}
            id={"phone"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setPhone(e.target.value)}
          />
          <label for={"phone"} className="form__label">
            Phone{" "}
            <i style={{ fontSize: "11px", fontStyle: "italic" }}>optional</i>
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            value={firstName}
            id={"firstName"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label for={"firstName"} className="form__label">
            First Name
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            value={lastName}
            id={"lastName"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label for={"lastName"} className="form__label">
            Last Name
          </label>
        </div>
        <div className="form">
          <input
            type="password"
            value={password}
            id={"password"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for={"password"} className="form__label">
            Password
          </label>
        </div>
        <div className="form">
          <input
            type="password"
            value={confirmPassword}
            id={"confirmPassword"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label for={"confirmPassword"} className="form__label">
            Confirm Password
          </label>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label style={{ paddingTop: "10px" }}>
          Create a Sitter Account?
          <input
            type="checkbox"
            checked={isSitter}
            onChange={() => setIsSitter((prev) => !prev)}
          />
        </label>
        {isSitter ? (
          <label
            style={{
              paddingTop: "18px",
              textAlign: "center",
            }}
          >
            Overnight Sitter?{" "}
            <i style={{ fontSize: "11px", fontStyle: "italic" }}>optional</i>
            <input
              type="checkbox"
              checked={overnight}
              onChange={() => setOvernight((prev) => !prev)}
            />
          </label>
        ) : (
          <p style={{ width: "500px", padding: "10px", paddingTop: "3px" }}></p>
        )}
        {isSitter ? (
          <label
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            Travel Sitter?{" "}
            <i style={{ fontSize: "11px", fontStyle: "italic" }}>optional</i>
            <input
              type="checkbox"
              checked={atHome}
              onChange={() => setAtHome((prev) => !prev)}
            />
          </label>
        ) : (
          <p style={{ width: "500px", padding: "10px", paddingTop: "3px" }}></p>
        )}
        <button type="submit">Create Account</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default SignupFormModal;
