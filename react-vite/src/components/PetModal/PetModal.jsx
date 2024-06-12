import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { newPetThunk } from "../../redux/pet";
import { editPetThunk } from "../../redux/pet";
import OpenDeleteModal from "../OpenDeleteModal";
import DeleteModal from "../DeleteModal";
import "./PetModal.css";

function PetModal({ user, pet, setIsLoaded }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [special, setSpecial] = useState("");
  const [addressId, setAddressId] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditLoaded, setIsEditLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal, isOpen } = useModal();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setIsSpecial(false);
    if (!isOpen) {
      if (pet) {
        setName(pet.name);
        setImage(null);
        setImagePreview(pet.pet_pic);
        setBirthday(formatDate(pet.birthday));
        setBreed(pet.breed);
        setAddressId(pet.home_address);
        if (pet.special_requests) {
          setSpecial(pet.special_requests);
          setIsSpecial(true);
        }
      } else {
        setName("");
        setImage(null);
        setImagePreview(
          "https://marconi22-ollie.s3.us-east-2.amazonaws.com/7d4c441d895e45c7856f569a466eb240.png"
        );
        setBirthday("");
        setBreed("");
        setIsSpecial(false);
        setSpecial("");
      }
      setIsEditLoaded(true);
      setErrors({});
    }
  }, [pet, isOpen, isEditLoaded]);

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
    setErrors(err);
    if (!imagePreview.includes(".png") || !imagePreview.includes(".jpg")) {
      err.image = "Image file must be a .JPG or .PNG";
    }

    setErrors(err);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("pet_pic", image);
      formData.append("name", name);
      formData.append("breed", breed);
      formData.append("birthday", birthday);
      formData.append("special_requests", isSpecial ? special : "");
      formData.append("home_address_id", addressId);

      setImageLoading(true);

      if (pet) {
        dispatch(editPetThunk(formData, pet.id)).then(() => {
          closeModal();
          setImageLoading(false);
          setIsLoaded(false);
        });
      } else {
        dispatch(newPetThunk(formData)).then(() => {
          closeModal();
          setImageLoading(false);
          setIsLoaded(false);
        });
      }


    }
  };

  return (
    isEditLoaded && (
      <>{console.log('==============================>',addressId)}
        <h1 className="form-title">
          {pet ? `Edit ${pet.name}'s Information` : "New Pet"}
        </h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <img src={imagePreview} alt="Pet" className="form-pic" />
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
          {errors.image && <p style={{margin: '10px'}}>words</p>}
          <div className="form">
            <input
              type="text"
              value={name}
              id={"name"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
            />
            <label htmlFor={"name"} className="form__label">
              Name
            </label>
          </div>
          <div className="form">
            <input
              type="date"
              value={birthday}
              id={"birthday"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
            <label htmlFor={"birthday"} className="form__label">
              Birthday
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              value={breed}
              id={"breed"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setBreed(e.target.value)}
              maxLength={30}
              required
            />
            <label htmlFor={"name"} className="form__label">
              Breed
            </label>
          </div>
          <div className="custom-select-wrapper">
          <select
      id="select-box"
      className="custom-select"
      value={addressId === 0 ? '' : addressId}
      onChange={(e) => setAddressId(parseInt(e.target.value))}
    >
      <option value="" disabled>
        Assign an Address
      </option>
      {user?.addresses.map((address) => (
        <option key={address.id} value={address.id}>
          {address.nickname || address.address_line}
        </option>
      ))}
    </select>
            </div>
          <label style={{ padding: "15px 0" }}>
            Pet in need of Special Care?
            <input
              type="checkbox"
              checked={isSpecial}
              onChange={() => setIsSpecial((prev) => !prev)}
            />
          </label>
          {isSpecial ? (
            <div className="form">
              <input
                type="text"
                value={special}
                id={"special"}
                className="form__input"
                placeholder=" "
                onChange={(e) => setSpecial(e.target.value)}
                maxLength={255}
                required
              />
              <label htmlFor={"special"} className="form__label">
                Special Requests
              </label>
            </div>
          ) : (
            <p
              style={{ height: "19px", padding: "10px", paddingTop: "3px" }}
            ></p>
          )}
          {errors.special && <p>{errors.special}</p>}
          <button type="submit">{pet ? "Update" : "Create"}</button>
          <div className="delete-div">
            {pet && (
              <OpenDeleteModal
                modalComponent={
                  <DeleteModal pet={pet} setIsLoaded={setIsLoaded} />
                }
              />
            )}
          </div>
          {imageLoading && <p>Loading...</p>}
        </form>
      </>
    )
  );
}

export default PetModal;
