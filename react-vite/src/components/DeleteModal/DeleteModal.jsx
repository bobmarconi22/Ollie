import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePetThunk } from "../../redux/pet";
import { deleteUserThunk } from "../../redux/session";
import { deleteAddressThunk } from "../../redux/address";
import "./DeleteModal.css";
import { deleteReviewThunk } from "../../redux/review";
import { useNavigate } from "react-router-dom";

function DeleteModal({ user, pet, review, address, setIsLoaded }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate()
  const obj = user ? 'User' : pet ? 'Pet' : review ? 'Review' : address ? 'Address' : null;
  const thunk = user ? deleteUserThunk : pet ? deletePetThunk : review ? deleteReviewThunk : address ? deleteAddressThunk : null;
  const id = user ? user.id : pet ? pet.id : review ? review.id : address ? address.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(thunk(id)).then(() => {
      if(obj === 'User'){
        navigate('/')
        closeModal()
        setIsLoaded(false)
      }
      navigate('/profile')
      closeModal()
      setIsLoaded(false)
    });
  };

  return (
    <>
      <h1 className="form-title">Are you sure you want to delete this {obj}?</h1>
      <form onSubmit={handleSubmit}>
        <p style={{color: '#ec223a', fontStyle: 'italic', fontSize: '20px'}}>This action <b style={{color: '#ec223a', fontStyle: 'italic', textDecoration: 'underline', fontSize: '20px'}}>cannot</b> be undone</p>
        <button className='confirm-delete' type="submit">Delete</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </>
  );
}

export default DeleteModal;
