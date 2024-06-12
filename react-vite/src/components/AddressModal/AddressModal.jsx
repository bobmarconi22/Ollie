import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { newAddressThunk } from "../../redux/address";
import { editAddressThunk } from "../../redux/address";
import DeleteModal from "../DeleteModal";
import OpenDeleteModal from "../OpenDeleteModal";

function AddressModal({ address, setIsLoaded }) {
  const dispatch = useDispatch();
  const [addressLine, setAddressLine] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState("");
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [isEditLoaded, setIsEditLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal, isOpen } = useModal();

  useEffect(() => {
    if (!isOpen) {
      if (address) {
        setNickname(address.nickname);
        setAddressLine(address.address_line);
        setCity(address.city);
        setState(address.state);
        setPostal(address.postal_code);
      } else {
        setAddressLine("");
        setCity("");
        setState("");
        setPostal("");
      }
      setIsEditLoaded(true);
      setErrors({});
    }
  }, [address, isOpen, isEditLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nickname,
      address_line: addressLine,
      city,
      state,
      postal_code: postal
    };

    if (address) {
      dispatch(editAddressThunk(formData, address.id)).then(() => {
        closeModal();
        setIsLoaded(false);
      });
    } else {
      dispatch(newAddressThunk(formData)).then(() => {
        closeModal();
        setIsLoaded(false);
      });
    }
  };

  return (
    isEditLoaded && (
      <>
        <h1 className="form-title">{address ? `Edit Address` : "New Address"}</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form">
            <input
              type="text"
              value={nickname}
              id={"nickname"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setNickname(e.target.value)}
            />
            <label htmlFor={"nickname"} className="form__label">
              Nickname
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              value={addressLine}
              id={"addressLine"}
              className="form__input"
              placeholder=" "
              required
              onChange={(e) => setAddressLine(e.target.value)}
            />
            <label htmlFor={"addressLine"} className="form__label">
              Address Line
            </label>
          </div>
          <div className="form">
            <input
              type="text"
              value={city}
              id={"city"}
              className="form__input"
              placeholder=" "
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor={"city"} className="form__label">
              City
            </label>
          </div>
          <label>
          <div className="custom-select-wrapper">
            <select
              value={state}
              className="custom-select"
              onChange={(e) => setState(e.target.value)}
              style={{fontSize: '16px', marginTop: '10px', marginBottom: '22px'}}
              required
            >
              <option value="" disabled>
                State
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            </div>
          </label>
          <div className="form">
            <input
              type="text"
              value={postal}
              id={"postal"}
              className="form__input"
              placeholder=" "
              required
              onChange={(e) => setPostal(e.target.value)}
            />
            <label htmlFor={"postal"} className="form__label">
              Postal
            </label>
          </div>
          <button type="submit">{address ? "Update" : "Create"}</button>
          {address && <div className="delete-div">
            {address && (
              <OpenDeleteModal
                modalComponent={
                  <DeleteModal address={address} setIsLoaded={setIsLoaded} />
                }
              />
            )}
          </div>}
        </form>
      </>
    )
  );
}

export default AddressModal;
