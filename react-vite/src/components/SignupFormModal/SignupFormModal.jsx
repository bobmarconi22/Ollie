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
    "https://marconi22-ollie.s3.us-east-2.amazonaws.com/5a423169513c4a26ab5053ed05efcf41.png"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <img src={imagePreview} alt="Pet" className="form-pic" />
        <label>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Phone Number
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
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
              width: "500px",
              padding: "14px 10px",
              paddingTop: "7px",
            }}
          >
            Overnight? (Always a drop off)
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
              width: "500px",
              padding: "14px 10px",
            }}
          >
            Travel? (Go to the pets home?)
            <input
              type="checkbox"
              checked={atHome}
              onChange={() => setAtHome((prev) => !prev)}
            />
          </label>
        ) : (
          <p style={{ width: "500px", padding: "10px", paddingTop: "3px" }}></p>
        )}
        {errors.phone && <p>{errors.phone}</p>}
        Password
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Create Account</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default SignupFormModal;
