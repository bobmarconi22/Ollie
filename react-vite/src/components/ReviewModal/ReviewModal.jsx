import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { newReviewThunk } from "../../redux/review";
import { editReviewThunk } from "../../redux/review";
import DeleteModal from "../DeleteModal";
import OpenDeleteModal from "../OpenDeleteModal";

function ReviewModal({ user, sitter, review, setIsLoaded, sitterId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState();
  const [reviewContext, setReviewContext] = useState("");
  const [petId, setPetId] = useState(0);
  const [isEditLoaded, setIsEditLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal, isOpen } = useModal();

  useEffect(() => {
    if (!isOpen) {
      if (review) {
        setRating(review.rating);
        setReviewContext(review.review);
        setPetId(review.pet_id);
      } else {
        setRating(0);
        setReviewContext("");
      }
      setIsEditLoaded(true);
      setErrors({});
    }
  }, [review, isOpen, isEditLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    if (rating === 0 || !rating) {
      return setErrors({ rating: "Please Specify 1-5 Paws" });
    }
    if (reviewContext.length > 500) {
      return setErrors({ review: "Review Maximum 500 Characters" });
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        rating: rating,
        review: reviewContext,
        pet_id: petId,
        sitter_id: sitterId,
      };

      if (review) {
        dispatch(editReviewThunk(formData, review.id)).then(() => {
          closeModal();
          setIsLoaded(false);
        });
      } else {
        dispatch(newReviewThunk(formData)).then(() => {
          closeModal();
          setIsLoaded(false);
        });
      }
    } else {
      return errors;
    }
  };

  return (
    isEditLoaded && (
      <>
        {console.log(errors.review, rating)}
        <h1 className="form-title">{review ? `Edit Review` : "New Review"}</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {!review && (
            <div className="custom-select-wrapper">
              <label htmlFor="select-box">Who Stayed?</label>
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
                    disabled={
                      sitter.reviews.filter(
                        (review) => review.pet_id === pet.id
                      ).length === 1
                    }
                  >
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <label className="rating-label">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span key={value} onClick={() => setRating(value)}>
                  <i
                    className="fa-solid fa-paw filled"
                    style={{
                      fontSize: "50px",
                      margin: "5px",
                      marginTop: "7px",
                      color:
                        value <= rating
                          ? "#209c85"
                          : "rgba(255, 255, 255, 0.75)",
                      cursor: 'pointer'
                    }}
                  ></i>
                </span>
              ))}
            </div>
            {errors.rating && (
              <p
                style={{
                  color: "red",
                  marginBottom: "22px",
                  fontStyle: "italic",
                }}
              >
                {errors.rating}
              </p>
            )}
            <p className="star-total">
              {rating} <b style={{ fontSize: "12px" }}>Paws</b>{" "}
            </p>
          </label>
          <div className="form">
            <input
              type="text"
              value={reviewContext}
              id={"reviewContext"}
              className="form__input"
              placeholder=" "
              onChange={(e) => setReviewContext(e.target.value)}
              maxLength={255}
              required
            />
            <label htmlFor={"name"} className="form__label">
              Review
            </label>
          </div>
          {errors.review && (
            <p
              style={{
                color: "red",
                marginTop: "-10px",
                marginBottom: "22px",
                fontStyle: "italic",
              }}
            >
              {errors.review}
            </p>
          )}
          <button type="submit">{review ? "Update" : "Create"}</button>
          {review && (
            <div className="delete-div">
              {review && (
                <OpenDeleteModal
                  modalComponent={
                    <DeleteModal review={review} setIsLoaded={setIsLoaded} />
                  }
                />
              )}
            </div>
          )}
        </form>
      </>
    )
  );
}

export default ReviewModal;
