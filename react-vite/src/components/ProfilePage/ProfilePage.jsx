import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditUserFormModal from "../EditUserFormModal";
import PetModal from "../PetModal/PetModal";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { thunkAuthenticate } from "../../redux/session";
import AddressModal from "../AddressModal/AddressModal";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAge = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years >= 1) {
      return `${years} Years`; // Return the age in years
    } else if (months >= 1) {
      return `${months} Months`; // Return the age in months if less than 1 year
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
            style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
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
            style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
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
            style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
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
            style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
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
            style={{ fontSize: "50px", margin: "5px", marginTop: "7px" }}
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
          You Have No Reviews
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (user && !isLoaded) {
      dispatch(thunkAuthenticate(user.id));
      setIsLoaded(true);
    }
  }, [dispatch, user, isLoaded]);

  return (
    user &&
    isLoaded && (
      <>
        <div id="profile-info">
          <h1 className="form-title" style={{ marginBottom: "10px" }}>
            Hi, {user.first_name}
          </h1>
          <img src={user.profile_pic} alt="" className="pfp" />
          <OpenModalMenuItem
            itemText="Edit"
            modalComponent={
              <EditUserFormModal user={user} setIsLoaded={setIsLoaded} />
            }
          />
          <p>{user.username}</p>
          <p>Email: {user.email}</p>
          {user.phone && <p>Phone: {user.phone}</p>}
          {user.sitter ? (
            <>
              <p>Upcoming Bookings: &nbsp; {user.bookings.length}</p>
              <p>Saved Addresses: &nbsp; {user.addresses.length}</p>
              <p>Pet Reviews: &nbsp; {user.reviews.length}</p>
              <h4
                style={{
                  fontSize: "25px",
                  textDecoration: "underline",
                  margin: 0,
                }}
              >
                Services:
              </h4>
              <p>
                Travel:{" "}
                {user.at_home ? (
                  <i style={{ color: "#209c85" }}>✓</i>
                ) : (
                  <i style={{ color: "#ec223a", fontSize: "18px" }}>𐄂</i>
                )}
              </p>
              <p>
                Overnight:{" "}
                {user.overnight ? (
                  <i style={{ color: "#209c85" }}>✓</i>
                ) : (
                  <i style={{ color: "#ec223a", fontSize: "18px" }}>𐄂</i>
                )}
              </p>
            </>
          ) : (
            <>
              <p>Pet Accounts: &nbsp; {user.pets.length}</p>
              <p>Saved Addresses: &nbsp; {user.addresses.length}</p>
            </>
          )}
        </div>
        {user.sitter && (
          <>
            <div id="profile-pets"></div>
            <h1 className="form-title" style={{ marginBottom: "10px" }}>
              Upcoming Bookings
            </h1>
            {user.bookings.length ? (
              user.bookings.map((booking) => (
                <div className="card" key={booking.id}>
                  <h2>
                    {booking.pet.name} -{" "}
                    <i style={{ fontSize: "14px", fontStyle: "italic" }}>
                      {booking.pet.breed} ({getAge(booking.pet.birthday)})
                    </i>
                  </h2>
                  <img src={booking.pet.pet_pic} alt="" className="pfp" />
                  {booking.pet.special_requests &&
                    (booking.special_requests ? (
                      <p>Special requests: {booking.special_requests}</p>
                    ) : (
                      <></>
                    ))}
                  {booking.at_home ? <p></p> : <p></p>}
                </div>
              ))
            ) : (
              <div
                className="sitter-page-reviews"
                style={{ textAlign: "center" }}
              >
                <p
                  className="paw-wrapper"
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontSize: "17px",
                  }}
                >
                  No Bookings
                </p>
              </div>
            )}
            <h1 className="form-title">My Reviews</h1>
            <div id="sitter-page-reviews">
              <div id="sitter-page-avg-reviews" style={{ textAlign: "center" }}>
                {avgReviews(user.reviews)}
              </div>
              {user.reviews.map((review) => {
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
                    <p className="review-pet-review">{review.review}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <h1 className="form-title" style={{ marginBottom: "10px" }}>
          My Pets
        </h1>
        <OpenModalMenuItem
          itemText="New Pet"
          modalComponent={<PetModal user={user} setIsLoaded={setIsLoaded} />}
        />
        {user.pets.map((pet) => (
          <div className="card" key={pet.id}>
            <h2>
              {pet.name} -{" "}
              <i style={{ fontSize: "14px", fontStyle: "italic" }}>
                {pet.breed} ({getAge(pet.birthday)})
              </i>
            </h2>
            <img
              src={pet.pet_pic}
              alt=""
              className="pfp-link"
              onClick={() => navigate(`/pet/${pet.id}`)}
            />
            {pet.special_requests && (
              <p>Special requests: {pet.special_requests}</p>
            )}
            {pet.home_address ? (
              pet.home_address.nickname && <p style={{fontStyle: 'italic'}}>{pet.home_address.nickname}</p> || <p style={{fontStyle: 'italic'}}>{pet.home_address.address_line} {pet.home_address.city}, {pet.home_address.state} {pet.home_address.postal_code}</p>) : <p style={{fontStyle: 'italic'}}>No Address Assigned</p>
            }
            <OpenModalMenuItem
              itemText="Edit"
              modalComponent={<PetModal pet={pet} user={user} setIsLoaded={setIsLoaded} />}
            />
          </div>
        ))}
        <h1 className="form-title" style={{ marginBottom: "10px" }}>
          Saved Addresses
        </h1>
        <OpenModalMenuItem
          itemText="Add Address"
          modalComponent={<AddressModal setIsLoaded={setIsLoaded} />}
        />
        {user.addresses.map((address) => (
          <div className="card" key={address.id}>
            <h2>
              {address.nickname || address.address_line}
            </h2>
              <p>{address.address_line} {address.city}, {address.state} {address.postal_code} </p>
            <OpenModalMenuItem
              itemText="Edit"
              modalComponent={
                <AddressModal address={address} setIsLoaded={setIsLoaded} />
              }
            />
          </div>
        ))}
      </>
    )
  );
}

export default ProfilePage;
