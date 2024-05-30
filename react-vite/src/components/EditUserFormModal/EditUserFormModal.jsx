import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./EditUserForm.css";

function EditUserFormModal({ user }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profile_pic);
  const [imageLoading, setImageLoading] = useState(false);
  const [username, setUsername] = useState(user.username);
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

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
      <label>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}

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
        <button type="submit">Update</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </>
  );
}

export default EditUserFormModal;
