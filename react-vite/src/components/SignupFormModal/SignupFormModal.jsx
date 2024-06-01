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
  const [imagePreview, setImagePreview] = useState("https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg");
  const [imageLoading, setImageLoading] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <img src={imagePreview} alt="Pet" className='form-pic'/>
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
          Phone Number
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Sign Up</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </>
  );
}

export default SignupFormModal;
