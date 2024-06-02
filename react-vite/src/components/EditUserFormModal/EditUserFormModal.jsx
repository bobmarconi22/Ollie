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
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [travel, setTravel] = useState(user.at_home);
  const [overnight, setOvernight] = useState(user.overnight);
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
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("overnight", overnight);
    formData.append("at_home", travel);
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
            className="choose-file"
            onChange={handleImageChange}
          />
        </label>
        <div className="form">
          <input
            type="text"
            value={username}
            id={'username'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label for={'username'} className="form__label">Username</label>
        </div>
        <div className="form">
          <input
            type="email"
            value={email}
            id={'email'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label for={'email'} className="form__label">Email</label>
        </div>
        <div className="form">
          <input
            type="phone"
            value={phone}
            id={'phone'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setPhone(e.target.value)}
          />
        <label for={'phone'} className="form__label">Phone <i style={{fontSize: '11px', fontStyle: 'italic'}}>optional</i></label>
        </div>
        <div className="form">
          <input
            type="text"
            value={firstName}
            id={'firstName'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        <label for={'firstName'} className="form__label">First Name</label>
        </div>
        <div className="form">
          <input
            type="text"
            value={lastName}
            id={'lastName'}
            className="form__input"
            placeholder=" "
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        <label for={'lastName'} className="form__label">Last Name</label>
        </div>
        {user.sitter && (
        <>
           <h1 className="form-title" style={{marginBottom: '10px'}}>Services</h1>
          <label>
          Overnight
          <input
            type="checkbox"
            checked={overnight}
            onChange={() => setOvernight((prevOvernight) => !prevOvernight)}
          />
        </label>
        <label>
          Travel
          <input
            type="checkbox"
            checked={travel}
            onChange={() => setTravel((prevTravel) => !prevTravel)}
          />
        </label>
          </>
        )}
        <button type="submit">Update</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </>
  );
}

export default EditUserFormModal;
