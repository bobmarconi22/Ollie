
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditUserFormModal from "../EditUserFormModal";
import PetModal from "../PetModal/PetModal";
import DeleteModal from "../DeleteModal";
import "./ProfilePage.css";
import OpenDeleteModal from "../OpenDeleteModal";
import { useEffect, useState } from "react";
import { thunkAuthenticate } from "../../redux/session";

function ProfilePage() {
  const dispatch = useDispatch();
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
    } else {
      return `${days} days`
    }
  };

  useEffect(() => {
    if (user && !isLoaded) {
      dispatch(thunkAuthenticate(user.id));
      setIsLoaded(true);
    }
  }, [dispatch, user, isLoaded]);

  return (
    user && isLoaded && (
      <>
        <div id="profile-info">
          <h1 className="form-title" style={{marginBottom: '10px'}}>Hi, {user.first_name}</h1>
          <img src={user.profile_pic} alt="" className="pet-pfp" />
          <OpenModalMenuItem
            itemText="Edit"
            modalComponent={<EditUserFormModal user={user} setIsLoaded={setIsLoaded} />}
          />
          <p>{user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {user.sitter ?
          <>
            <p>Bookings: {user.bookings.length}</p>
            <p>Addresses: {user.addresses.length}</p>
            <p>Services: {user.at_home ? 'true' : 'false'}</p>
          </>
          :
          <>
          <p>Pets: {user.pets.length}</p>
          <p>Addresses: {user.addresses.length}</p>
          <p>Bookings: {user.reviews.length}</p>
          </>
          }
          <OpenDeleteModal
              modalComponent={<DeleteModal user={user} setIsLoaded={setIsLoaded} />}
            />
        </div>
        <div id="profile-pets"></div>
        <h1 className="form-title" style={{marginBottom: '10px'}}>{user.sitter ? 'Bookings' : 'Pets'}</h1>
        {!user.sitter && <OpenModalMenuItem
          itemText="New Pet"
          modalComponent={<PetModal user={user} setIsLoaded={setIsLoaded} />}
        />}
        {user.sitter ?
        user.bookings.map(booking => (
          <div className="pet-card" key={booking.id}>
            <h2>{booking.pet.name} - <i style={{ fontSize: '14px', fontStyle: 'italic' }}>{booking.pet.breed} ({getAge(booking.pet.birthday)})</i></h2>
            <img src={booking.pet.pet_pic} alt="" className="pet-pfp" />
            <p>Address: {booking.at_home ? `${user.addresses[0].address_line} ${user.addresses[0].city}, ${user.addresses[0].state} ${user.addresses[0].postal_code}` : `${user.booking.pet.home_address.address_line} ${user.booking.pet.home_address.city}, ${user.booking.pet.home_address.state} ${user.booking.pet.home_address.postal_code}`}</p>
            {booking.special_requests && <p>Special requests: {booking.special_requests}</p>}
          </div>
        ))
        :
        user.pets.map(pet => (
          <div className="pet-card" key={pet.id}>
            <h2>{pet.name} - <i style={{ fontSize: '14px', fontStyle: 'italic' }}>{pet.breed} ({getAge(pet.birthday)})</i></h2>
            <img src={pet.pet_pic} alt="" className="pet-pfp" />
            <p>Address: {pet.home_address || <button onClick={() => alert('feature coming soon')}>Assign an Address</button>}</p>
            {pet.special_requests && <p>Special requests: {pet.special_requests}</p>}
            <OpenModalMenuItem
              itemText="Edit"
              modalComponent={<PetModal pet={pet} setIsLoaded={setIsLoaded} />}
            />
            <OpenDeleteModal
              modalComponent={<DeleteModal pet={pet} setIsLoaded={setIsLoaded} />}
            />
          </div>
        ))}
      </>
    )
  );
}

export default ProfilePage;
