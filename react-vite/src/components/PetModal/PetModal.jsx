import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { newPetThunk } from "../../redux/pet";
import { editPetThunk } from "../../redux/pet";
import "./PetModal.css";

function PetModal({ user, pet, setIsLoaded }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [birthday, setBirthday] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [special, setSpecial] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditLoaded,setIsEditLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal, isOpen } = useModal();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setIsSpecial(false)
    if (!isOpen) {
    if (pet) {
      setName(pet.name);
      setImage(null);
      setImagePreview(pet.pet_pic);
      setBirthday(formatDate(pet.birthday));
      setBreed(pet.breed);
      if(pet.special_requests !== ''){
        setSpecial(pet.special_requests);
        setIsSpecial(true);
      }
    } else {
      setName("");
      setImage(null);
      setImagePreview("https://marconi22-ollie.s3.us-east-2.amazonaws.com/1007d6fe3d324359aa693458943b25dd.png");
      setBirthday("");
      setBreed("");
      setSpecial("");
    }
    setIsEditLoaded(true)
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

    const formData = new FormData();
    formData.append("pet_pic", image);
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("birthday", birthday);
    formData.append("special_requests", isSpecial ? special : '');

    setImageLoading(true);

    if(pet){
      dispatch(editPetThunk(formData, pet.id)).then(() => {
        closeModal()
        setImageLoading(false)
        setIsLoaded(false)
      });
    }else{
      dispatch(newPetThunk(formData)).then(() => {
      closeModal()
      setImageLoading(false)
      setIsLoaded(false)
    });
    }

  }

  return ( isEditLoaded &&
    <>{console.log(isSpecial)}
      <h1 className="form-title">{pet ? `Edit ${pet.name}'s Information` : 'New Pet'}</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          <img src={imagePreview} alt="Pet" className='form-pic'/>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
          Breed
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        {errors.breed && <p>{errors.breed}</p>}
        <label style={{paddingTop: '10px'}}>
          Pet in need of Special Care?
          <input
            type="checkbox"
            checked={isSpecial}
            onChange={() => setIsSpecial((prev) => !prev)}
          />
        </label>
        {isSpecial ? (
          <label style={{width: '500px', padding: '14px 10px', paddingTop: '7px'}}>
            Special Requirements
            <input
              type="text"
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
              required={isSpecial}
            />
          </label>
        )
      :
      <p style={{width: '500px', padding: '10px', paddingTop: '3px'}}></p>
      }
        {errors.special && <p>{errors.special}</p>}
        <button type="submit">{pet ? 'Update' : 'Create'}</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </>
  );
}

export default PetModal;
