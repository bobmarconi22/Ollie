import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { newPetThunk } from "../../redux/pet";
import "./PetModal.css";

function PetModal({ user }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState('https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg');
  const [birthday, setBirthday] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [special, setSpecial] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!image){
      setImage('https://marconi22-ollie.s3.us-east-2.amazonaws.com/8512b4f33e95447db806cb48a74957b0.jpg')
    }

    const formData = new FormData();
    formData.append("pet_pic", image);
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("birthday", birthday);
    formData.append("special_requests", special);
    formData.append("owner_id", user.id);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    const serverResponse = await dispatch(newPetThunk(formData));

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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          <img src={image} alt="" id="profile-form" style={{ width: "40px" }} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Birthday
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </label>
        {errors.birthday && <p>{errors.birthday}</p>}
        <label>
          breed
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        {errors.breed && <p>{errors.breed}</p>}
        <label>
          Special Requirements
          <input
            type="text"
            value={special}
            onChange={(e) => setSpecial(e.target.value)}
            required
          />
        </label>
        {errors.special && <p>{errors.special}</p>}
        <button type="submit">Update</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default PetModal;
