import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PetModal from "../PetModal/PetModal";
import DeleteModal from "../DeleteModal";
import OpenDeleteModal from "../OpenDeleteModal";
import { useEffect, useState } from "react";
import { getSitterByIdThunk } from "../../redux/sitter";
import "./SitterPage.css";
import { getPetsThunk } from "../../redux/pet";

function SitterPage() {
  const dispatch = useDispatch();
  const { sitterId } = useParams();
  const sitter = useSelector((state) => state.sitter.selected);
  const pets = useSelector((state) => state.pet.all.pets);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSitterByIdThunk(sitterId)).then(() => {
      dispatch(getPetsThunk()).then(() => {
        setIsLoaded(true);
      });
    });
  }, [dispatch, sitterId]);

  const getAge = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years >= 1) {
      return `${years} Years`; // Return the age in years
    } else if (months >= 1) {
      return `${months} Months`; // Return the age in months if less than 1 year
    } else {
      return `${days} days`;
    }
  };
  const avgReviews = (arr) => {
    let sum = 0;
    for (let review of arr) {
      sum += review.rating;
    }
    let avg = (sum / arr.length).toFixed(1);

    return arr.length ? (
      <div className="sitter-reviews">
        <span className="paw-wrapper">
          <i
            className="fa-solid fa-paw"
            style={{ fontSize: "50px", margin: "5px", marginTop: '7px' }}
          ></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 1
                  ? "none"
                  : `polygon(0 0, ${avg * 100}% 0, ${avg * 100}% 100%, 0 100%)`,
              fontSize: "50px",
              margin: "5px",
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i
            className="fa-solid fa-paw"
            style={{ fontSize: "50px", margin: "5px", marginTop: '7px'}}
          ></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 2
                  ? "none"
                  : `polygon(0 0, ${(avg - 1) * 100}% 0, ${
                      (avg - 1) * 100
                    }% 100%, 0 100%)`,
              fontSize: "50px",
              margin: "5px",
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i
            className="fa-solid fa-paw"
            style={{ fontSize: "50px", margin: "5px", marginTop: '7px' }}
          ></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 3
                  ? "none"
                  : `polygon(0 0, ${(avg - 2) * 100}% 0, ${
                      (avg - 2) * 100
                    }% 100%, 0 100%)`,
              fontSize: "50px",
              margin: "5px",
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i
            className="fa-solid fa-paw"
            style={{ fontSize: "50px", margin: "5px", marginTop: '7px' }}
          ></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 4
                  ? "none"
                  : `polygon(0 0, ${(avg - 3) * 100}% 0, ${
                      (avg - 3) * 100
                    }% 100%, 0 100%)`,
              fontSize: "50px",
              margin: "5px",
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i
            className="fa-solid fa-paw"
            style={{ fontSize: "50px", margin: "5px", marginTop: '7px' }}
          ></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 5
                  ? "none"
                  : `polygon(0 0, ${(avg - 4) * 100}% 0, ${
                      (avg - 4) * 100
                    }% 100%, 0 100%)`,
              fontSize: "50px",
              margin: "5px",
            }}
          ></i>
        </span>
        &nbsp;&nbsp;
        <span className="paw-wrapper">
          <p style={{ fontSize: "24px" }}>
            <b
              style={{
                color: "#b4b4b4",
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
          style={{ color: "#b4b4b4", fontSize: "17px" }}
        >
          No Reviews
        </p>
      </div>
    );
  };

  return (
    sitter &&
    isLoaded && (
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
              {sitter.addresses[0].city}, {sitter.addresses[0].state}
            </p>
            <p id="sitter-page-distance">X miles away</p>
            {sitter.overnight && <p>Overnight Available</p>}
            {sitter.at_home && <p>Comes to you!</p>}
          </div>
        </div>
        <div id="sitter-page-reviews">
          <div id="sitter-page-avg-reviews" style={{textAlign: 'center'}}>{avgReviews(sitter.reviews)}</div>
          {sitter.reviews.map((review) => {
            // Log outside JSX
            return (
              <div className="review-card" key={review.id}>
                <h1 className="review-pet-name">
                  {review.pet.name} - <i style={{fontSize: '16px', fontStyle: 'italic', color: '#b4b4b4'}}>
                  {getAge(review.pet.birthday)}
                </i>
                </h1>

                <p className="review-pet-rating">{review.rating} <i
            className="fa-solid fa-paw filled"
          ></i></p>
                <p className="review-pet-review">{review.review}</p>
              </div>
            );
          })}
        </div>
      </>
    )
  );
}

export default SitterPage;
