import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editUserThunk } from "../../redux/session";
import OpenDeleteModal from "../OpenDeleteModal";
import DeleteModal from "../DeleteModal";
import "./EditUserForm.css";

function EditUserFormModal({ user, setIsLoaded }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.profile_pic);
  const [phone, setPhone] = useState(user.phone);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.profile_pic);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [isSitter, setIsSitter] = useState(user.sitter);
  const [overnight, setOvernight] = useState(user.overnight);
  const [addressId, setAddressId] = useState(user.addresses.find(address => address.sitting_address === true) || '');
  const [atHome, setAtHome] = useState(user.at_home);
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
    setErrors({});
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
    if (Object.keys(err).length === 0) {
      const formData = new FormData();
      formData.append("profile_pic", image);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("overnight", overnight);
      formData.append("at_home", atHome);
      formData.append("sitter", isSitter);
      formData.append("sitting_address_id", parseInt(addressId.id));

      setImageLoading(true);
      const serverResponse = await dispatch(editUserThunk(formData, user.id));
      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      <h1 className="form-title">Edit Info</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <img src={imagePreview} alt="" className="form-pic" />
        <div className="file-upload">
          <label htmlFor="file-input" className="custom-file-upload">
            Upload File
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/jpeg, image/png"
            className="choose-file"
            onChange={handleImageChange}
          />
        </div>
        <div className="form">
          <input
            type="text"
            value={username}
            id={"username"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            required
          />
          <label htmlFor={"username"} className="form__label">
            Username
          </label>
        </div>
        {errors.username && (
          <p
            style={{
              color: "red",
              marginTop: "-10px",
              marginBottom: "15px",
              fontStyle: "italic",
            }}
          >
            {errors.username}
          </p>
        )}
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
          <label htmlFor={"email"} className="form__label">
            Email
          </label>
        </div>
        <div className="form">
          <input
            type="phone"
            value={phone}
            id={"phone"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor={"phone"} className="form__label">
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
            maxLength={18}
            required
          />
          <label htmlFor={"firstName"} className="form__label">
            First Name
          </label>
        </div>
        {errors.firstName && (
          <p
            style={{
              color: "red",
              marginTop: "-10px",
              marginBottom: "22px",
              fontStyle: "italic",
            }}
          >
            {errors.firstName}
          </p>
        )}
        <div className="form">
          <input
            type="text"
            value={lastName}
            id={"lastName"}
            className="form__input"
            placeholder=" "
            onChange={(e) => setLastName(e.target.value)}
            maxLength={20}
            required
          />
          <label htmlFor={"lastName"} className="form__label">
            Last Name
          </label>
        </div>
        {errors.lastName && (
          <p
            style={{
              color: "red",
              marginTop: "-10px",
              marginBottom: "22px",
              fontStyle: "italic",
            }}
          >
            {errors.lastName}
          </p>
        )}
        <label style={{ paddingTop: "10px" }}>
          Offer Pet Sitting Services?
          <input
            type="checkbox"
            checked={isSitter}
            disabled={isSitter && user.bookings.length !== 0}
            onChange={() => setIsSitter((prev) => !prev)}
          />
          {isSitter && user.bookings.length !== 0 && <p style={{ fontSize: "12px", fontStyle: "italic" }}>
            Note: you can not disable your sitting services with upcoming
            bookings.
          </p>}
        </label>
        {isSitter ? (
              <>
              <div className="custom-select-wrapper">
                <select
                  id="select-box"
                  className="custom-select"
                  value={addressId}
                  style={{marginTop: '30px'}}
                  onChange={(e) => setAddressId(e.target.value)}
                >
                  <option value="" disabled>
                    Sitting Address
                  </option>
                  {user?.addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.nickname || address.address_line}
                    </option>
                  ))}
                </select>
              </div>
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
                {isSitter && <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                  Note: any changes made to offered services will take effect to
                  any future requests, not to existing requests or bookings
                </p>}
              </label>
            </>
            ) : (
              <p style={{ width: "500px", height: '166px', padding: "10px", paddingTop: "3px" }}></p>
            )}

        <button type="submit">Update</button>
        <div className="delete-div">
          <OpenDeleteModal
            modalComponent={
              <DeleteModal user={user} setIsLoaded={setIsLoaded} />
            }
          />
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default EditUserFormModal;
