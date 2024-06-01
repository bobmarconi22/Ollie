import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editUserThunk } from "../../redux/session";
import "./EditUserForm.css";

function EditUserFormModal({ user }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profile_pic);
  const [phone, setPhone] = useState(user.phone);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.profile_pic);
  const [username, setUsername] = useState(user.username);
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

    const formData = new FormData();
    formData.append("profile_pic", image);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("username", username);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(editUserThunk(formData, user.id)).then(() => {
      closeModal()
      setImageLoading(false)
      setIsLoaded(false)
    });
  }

  return (
    <>
      <h1 className="form-title">Edit Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
      <label>
          <img src={imagePreview} alt="" className='form-pic'/>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
        <label>
          Phone Number
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </>
  );
}

export default EditUserFormModal;
