import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditUserFormModal from "../EditUserFormModal";
import "./ProfilePage.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  return (
    user && (
      <>
        <div id="profile-info">
          <h1>Hi, {user.first_name}</h1>
          <button>
            <OpenModalMenuItem
              itemText="Edit"
              modalComponent={<EditUserFormModal user={user} />}
            />
          </button>
          <p>{user.username}</p>
          <p>Pets: {user.pets.length}</p>
          <p>Addresses: {user.addresses.length}</p>
          <p>Bookings: {user.reviews.length}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div id="profile-pets"></div>
      </>
    )
  );
}

export default ProfilePage;
