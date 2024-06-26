import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useEffect, useState } from "react";
import { getSitterByIdThunk } from "../../redux/sitter";
import { getPetsThunk } from "../../redux/pet";
import ReviewModal from "../ReviewModal/ReviewModal";
import BookingModal from "../BookingModal";
import Loading from "../Loading";
import "./SitterPage.css";

function SitterPage() {
  const dispatch = useDispatch();
  const { sitterId } = useParams();
  const sitter = useSelector((state) => state.sitter.selected);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSitterByIdThunk(sitterId)).then(() => {
      dispatch(getPetsThunk()).then(() => {
        setIsLoaded(true);
      });
    });
  }, [dispatch, sitterId, isLoaded]);

  const getAge = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years >= 1) {
      return `${years} Years`;
    } else if (months >= 1) {
      return `${months} Months`;
    } else{
      return `${diffDays + 1} Days`
    }
  };

  const checkPaw = (avg, num) => {
    return (
      <span className="paw-wrapper">
        <i
          className="fa-solid fa-paw"
          style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
        ></i>
        <i
          className="fa-solid fa-paw filled"
          style={{
            clipPath:
              avg >= num
                ? "none"
                : `polygon(0 0, ${(avg - (num - 1)) * 100}% 0, ${
                    (avg - (num - 1)) * 100
                  }% 100%, 0 100%)`,
            fontSize: "50px",
            margin: "5px",
          }}
        ></i>
      </span>
    );
  };

  const avgReviews = (arr) => {
    let sum = 0;
    for (let review of arr) {
      sum += review.rating;
    }
    let avg = (sum / arr.length).toFixed(1);

    return arr.length ? (
      <div className="sitter-reviews">
        {checkPaw(avg, 1)}
        {checkPaw(avg, 2)}
        {checkPaw(avg, 3)}
        {checkPaw(avg, 4)}
        {checkPaw(avg, 5)}
        &nbsp;&nbsp;
        <span className="paw-wrapper">
          <p style={{ fontSize: "24px" }}>
            <b
              style={{
                color: "rgba(255, 255, 255, 0.75)",
                textDecoration: "underline",
                fontSize: "24px",
              }}
            >
              {arr.length}
            </b>{" "}
            Reviews
          </p>
        </span>
      </div>
    ) : (
      <div className="sitter-page-reviews">
        <p
          className="paw-wrapper"
          style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "17px" }}
        >
          No Reviews
        </p>
      </div>
    );
  };

  const Tooltip = ({ children, tooltipText }) => {
    return (
      <div className="tooltip-container">
        {children}
        <div className="tooltip-text">{tooltipText}</div>
      </div>
    );
  };

  return sitter ? (
    isLoaded ? (
      <>
        <div id="sitter-info">
          <img
            src={sitter.profile_pic}
            alt={`${sitter.first_name}'s Profile Picture`}
            id="sitter-page-pfp"
          />
          <div id="sitter-facts">
            <h1 id="sitter-page-name">
              {sitter.first_name} {sitter.last_name}
            </h1>
            <p id="sitter-page-location">
              {sitter.addresses[0]?.city} <br /> {sitter.addresses[0]?.state}
            </p>
            <div id="tooltip-div">
              {sitter.overnight && (
                <Tooltip tooltipText="Offers Overnight Sitting!">
                  <button id="tool-button">
                    <i className="fas fa-moon"></i>
                  </button>
                </Tooltip>
              )}
              {sitter.at_home && (
                <Tooltip tooltipText="Offers Travel Services">
                  <button id="tool-button">
                    <i className="fas fa-home"></i>
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div id="book-now-div">
            <OpenModalMenuItem
              itemText="Book Now!"
              className="book-now-button"
              modalComponent={
                <BookingModal
                  user={user}
                  setIsLoaded={setIsLoaded}
                  sitterId={sitterId}
                  sitter={sitter}
                />
              }
            />
          </div>
        </div>
        <div id="sitter-page-reviews">
          <div id="sitter-page-avg-reviews" style={{ textAlign: "center" }}>
            {avgReviews(sitter.reviews)}
            {user && sitter.id !== user.id && (
              <OpenModalMenuItem
                itemText="New Review"
                modalComponent={
                  <ReviewModal
                    user={user}
                    setIsLoaded={setIsLoaded}
                    sitterId={sitterId}
                    sitter={sitter}
                  />
                }
              />
            )}
          </div>
          {sitter.reviews
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((review) => {
              return (
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
                  {user &&
                    user.pets.filter((pet) => pet.id === review.pet_id)
                      .length !== 0 && (
                      <>
                        <OpenModalMenuItem
                          itemText="Edit Review"
                          modalComponent={
                            <ReviewModal
                              user={user}
                              review={review}
                              setIsLoaded={setIsLoaded}
                              sitterId={sitterId}
                              sitter={sitter}
                            />
                          }
                        />
                      </>
                    )}
                </div>
              );
            })}
        </div>
      </>
    ) : (
      <Loading />
    )
  ) : (
    <h1>Sitter Not Found</h1>
  );
}

export default SitterPage;
