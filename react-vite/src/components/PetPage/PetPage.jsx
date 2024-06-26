import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewModal from "../ReviewModal";
import PetModal from "../PetModal/PetModal";
import { useEffect, useState } from "react";
import { getPetByIdThunk } from "../../redux/pet";
import { getReviewsByPetThunk } from "../../redux/review";
import Loading from "../Loading";
import "./PetPage.css";

function PetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { petId } = useParams();
  const user = useSelector((state) => state.session.user);
  const pet = useSelector((state) => state.pet.selected);
  const reviews = useSelector((state) => state.review.pet_reviews);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAge = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years >= 1) {
      return `${years} Years`;
    } else {
      return `${months} Months`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPetByIdThunk(petId));
      await dispatch(getReviewsByPetThunk(petId));
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, petId, isLoaded]);

  return (
    isLoaded ? (
      <>
        <div id="pet-profile" style={{ width: "80%" }}>
          <img
            src={pet.pet_pic}
            alt=""
            className="pfp"
            style={{ margin: "0 auto" }}
          />
          <h1 className="form-title" style={{ marginBottom: "10px" }}>
            {pet.name}
          </h1>
          <p
            style={{
              fontSize: "15px",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {pet.breed} ({getAge(pet.birthday)})
          </p>
          {pet.special_requests && (
            <p>Special requests: {pet.special_requests}</p>
          )}
          {pet.home_address ? (
            <>
              {pet.home_address.nickname && <p style={{ fontStyle: "italic" }}>{pet.home_address.nickname}:</p>}
              <p style={{fontStyle: 'italic'}}>{pet.home_address.address_line} {pet.home_address.city}, {pet.home_address.state} {pet.home_address.postal_code}</p>
            </>
          ) : (
            <p style={{ fontStyle: "italic" }}>No Address Assigned</p>
          )}
          <br />
          <OpenModalMenuItem
            itemText={`Edit ${pet.name}'s Info`}
            modalComponent={
              <PetModal pet={pet} user={user} setIsLoaded={setIsLoaded} />
            }
          />
          <br />
          <h1
            className="form-title"
            style={{ marginBottom: "10px", marginTop: "30px" }}
          >
            {pet.name}&apos;s Bookings
          </h1>
            {pet.bookings ? <></>
            :(
            <>
            <p style={{marginBottom: '5px', marginTop: '35px'}}>No Upcoming Bookings</p>
            <button onClick={() => navigate('/')}>Find A Sitter!</button>
            </>
            )}
          <h1
            className="form-title"
            style={{ marginBottom: "10px", marginTop: "30px" }}
          >
            {pet.name}&apos;s Reviews
          </h1>
          {reviews.pet_reviews
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((review) => (
              <div className="review-card" key={review.id}>
                <h1 className="review-pet-name">
                  {review.pet.name} -{" "}
                  <i
                    style={{
                      fontSize: "16px",
                      fontStyle: "italic",
                      color: "rgba(255, 255, 255, 0.75)",
                    }}
                  >
                    {getAge(review.pet.birthday)}
                  </i>
                </h1>

                <p className="review-pet-rating">
                  {review.rating} <i className="fa-solid fa-paw filled"></i>
                </p>
                <p
                  className="review-pet-review"
                  style={{ wordWrap: "break-word" }}
                >
                  {review.review}
                </p>
                <OpenModalMenuItem
                  itemText="Edit Review"
                  modalComponent={
                    <ReviewModal
                      user={user}
                      review={review}
                      setIsLoaded={setIsLoaded}
                      sitterId={review.sitter_id}
                    />
                  }
                />
              </div>
            ))}
        </div>
      </>
    )
    :
    <Loading />
  );
}

export default PetPage;
