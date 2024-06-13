import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { newPetThunk } from "../../redux/pet";
import { editPetThunk } from "../../redux/pet";
import OpenDeleteModal from "../OpenDeleteModal";
import DeleteModal from "../DeleteModal";
import "./BookingModal.css";

function BookingModal({ user, pet, setIsLoaded, sitter }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [special, setSpecial] = useState("");
  const [addressId, setAddressId] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditLoaded, setIsEditLoaded] = useState(false);
  const [petId, setPetId] = useState(0);
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
      <>
        <h1 className="form-title">
          {sitter.first_name} {sitter.last_name}
        </h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <img src={sitter.profile_pic} alt="Pet" className="form-pic" />
            <div className="custom-select-wrapper">
              <label htmlFor="select-box"></label>
              <select
                id="select-box"
                className="custom-select"
                value={petId === 0 ? "" : petId}
                onChange={(e) => setPetId(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a Pet
                </option>
                {user.pets.map((pet) => (
                  <option
                    key={pet.id}
                    value={pet.id}
                  >
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="form">
            <input
              type="date"
              value={startDate}
              id={"startDate"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <label htmlFor={"startDate"} className="form__label">
              Start Date
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

export default BookingModal;
