import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BookingModal.css";
import { newRequestThunk } from "../../redux/booking";

function BookingModal({ user, setIsLoaded, sitter }) {
  const dispatch = useDispatch();
  const sitterAddress = useSelector(state => state.sitter.selected.addresses.find(address => address.sitting_address === true))
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validDate, setValidDate] = useState(true)
  const [overnight, setOvernight] = useState(false);
  const [special, setSpecial] = useState("");
  const [addressId, setAddressId] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isEditLoaded, setIsEditLoaded] = useState(false);
  const [petId, setPetId] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal, isOpen } = useModal();

  const selectedPet = user.pets.find(pet => pet.id === petId);

  useEffect(() => {
    setIsSpecial(false);
    if (!isOpen) {
      setIsEditLoaded(true);
      setErrors({});
    }
    if(selectedPet && selectedPet.special_requests){
      setIsSpecial(true)
      setSpecial(selectedPet.special_requests)
    }
  }, [selectedPet, isOpen, isEditLoaded]);

  useEffect(() => {
    const checkOvernight = () => {
      if (startDate && endDate) {
        if (new Date(startDate).toDateString() < new Date(endDate).toDateString()) {
          setOvernight(true);
        } else {
          setOvernight(false);
        }
      }
    };

    checkOvernight();
  }, [startDate, endDate]);

  const checkValidEnd = () => {
    if (startDate && endDate) {
      if (new Date(endDate) > new Date('01-01-1000') )
      if (new Date(startDate).toDateString() < new Date(endDate).toDateString()) {
        setValidDate(false)
      }
  }
  setValidDate(true)
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("pet_id", petId);
      formData.append("sitter_id", sitter.id);
      formData.append("address_id", addressId);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);

        dispatch(newRequestThunk(formData)).then(() => {
          closeModal();
          setIsLoaded(false);
        });


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
                value={petId}
                onChange={(e) => setPetId(parseInt(e.target.value))}
                required
              >
                <option value={0} disabled>
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
            {sitter.overnight ?
            <>
              <div className="form">
            <input
              type="date"
              value={startDate}
              id={"startDate"}
              className="form__input"
              placeholder=" "
              onChange={(e) => {
                setStartDate(e.target.value);
                setEndDate(e.target.value)
              }}
              required
            />
            <label htmlFor={"startDate"} className="form__label">
              Start Date
            </label>
          </div>
          <div className="form">
            <input
              type="date"
              value={endDate}
              id={"endDate"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <label htmlFor={"endDate"} className="form__label">
              End Date
            </label>
          </div>
            {checkValidEnd && !validDate && <p style={{margin: 0, fontStyle: 'italic', color: '#ec223a'}}>Cannot end before it starts!!!</p>}
            </>
            :
            <div className="form">
            <input
              type="date"
              value={startDate}
              id={"startDate"}
              className="form__input"
              placeholder=" "
              onChange={(e) => {
                setStartDate(e.target.value);
                setEndDate(e.target.value)
              }}
              required
            />
            <label htmlFor={"startDate"} className="form__label">
              Sitting Date
            </label>
          </div>

            }
          {sitter.at_home && !overnight ?
            <div className="custom-select-wrapper">
          <select
      id="select-box"
      className="custom-select"
      value={addressId === 0 ? '' : addressId}
      onChange={(e) => setAddressId(parseInt(e.target.value))}
      style={{margin: '38px auto 37px auto'}}
    >
      <option value="" disabled>
        Address
      </option>
      {selectedPet && selectedPet.home_address && (
        <option value={selectedPet.home_address.id}>{selectedPet.home_address.nickname || selectedPet.home_address.address_line}</option>
      )}
      {sitterAddress && (
        <option value={sitterAddress.id}>{sitterAddress.address_line}</option>
      )}
    </select>
            </div>
            :
            <>
            {sitter.overnight && overnight && <p style={{fontStyle: 'italic', margin: '5px'}}>Overnight Sitting Appointments are drop off only</p>}
            <p>
              Drop Off At: <br />
              <br />
              {sitter.addresses.find(address => address.sitting_address).address_line} {sitter.addresses.find(address => address.sitting_address).city} {sitter.addresses.find(address => address.sitting_address).state} {sitter.addresses.find(address => address.sitting_address).postal_code}</p>
            </>
            }
          <label style={{ padding: "15px 0" }}>
            Include Special Requests?
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
          <button type="submit">{selectedPet ? "Update" : "Create"}</button>
        </form>
      </>
    )
  );
}

export default BookingModal;
