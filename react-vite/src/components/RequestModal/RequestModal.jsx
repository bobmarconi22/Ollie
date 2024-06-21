import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { acceptBookingThunk, deleteRequestThunk } from "../../redux/booking";
import "./RequestModal.css";

function RequestModal({ user, setIsLoaded }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const userFormatDate = (date) => {
    return `${date.split(" ")[0]} ${date.split(" ")[2]} ${date.split(" ")[1]} ${
      date.split(" ")[3]
    }`;
  };

  const acceptBooking = (request) => () => {
    const formData = new FormData();
    formData.append("pet_id", request.pet_id);
    formData.append("sitter_id", request.sitter_id);
    formData.append("address_id", request.address_id);
    formData.append("start_date", new Date(request.start_date));
    formData.append("end_date", new Date(request.end_date));

    dispatch(acceptBookingThunk(formData)).then(() => {
      closeModal();
      setIsLoaded(false);
    });
  };

  const declineBooking = (request) => () => {
    dispatch(deleteRequestThunk(request)).then(() => {
      closeModal();
      setIsLoaded(false);
    });
  };

  return (
    <>
      {user.booking_requests && user.booking_requests.length > 0 ? (
        <>
          <h1 className="form-title">Requests</h1>
          {user.booking_requests.map((request) => (
            <>
              <div
                key={request.id}
                className="card"
                style={{ margin: "50px auto 5px auto" }}
              >
                <h2>{request.pet.name}</h2>
                <img
                  src={request.pet.pet_pic}
                  alt="pet-pic"
                  className="request-pfp"
                />
                {request.at_home && request.address.nickname ? (
                  <p id="location">{request.address.nickname}</p>
                ) : (
                  <p className="location">
                    {request.address.address_line} {request.address.city},{" "}
                    {request.address.state} {request.address.postal_code}
                  </p>
                )}
                {request.pet.special_requests && request.special_requests && (
                  <p>Special requests: {request.special_requests}</p>
                )}
                {request.overnight ? (
                  <p className="date">
                    {userFormatDate(request.start_date)} -{" "}
                    {userFormatDate(request.end_date)}
                  </p>
                ) : (
                  <p className="date">{userFormatDate(request.start_date)}</p>
                )}
              </div>
              <div className="request-buttons">
                <button
                  className="request-confirm"
                  onClick={acceptBooking(request)}
                >
                  ✓
                </button>
                <button
                  className="request-delete"
                  onClick={declineBooking(request)}
                >
                  X
                </button>
              </div>
            </>
          ))}
          <br />
        </>
      ) : (
        <h1
          className="form-title"
          style={{ padding: "0", margin: "50px auto", border: "none" }}
        >
          No Requests Yet!
        </h1>
      )}
    </>
  );
}

export default RequestModal;
