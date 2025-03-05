// src/components/UserProfile/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { dummyExecutiveOrders } from "../App/App";
import MenuPopUp from "../MenuPopUp/MenuPopUp";
import './UserProfile.css';

function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "Test Person",
    email: "testperson@email.com",
    state: "New York",
    zip: "12345",
  });

  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState(dummyExecutiveOrders);

  useEffect(() => {
    fetchLocalRepresentatives(userInfo.zip);
  }, [userInfo.zip]);

  const fetchLocalRepresentatives = (zip) => {
    setLocalRepresentatives([
      // FETCH CALL HERE
      { name: "Representative 1", party: "Yes", state: "NY" }, 
      { name: "Representative 2", party: "No", state: "NY" }, 
    ]);
  };

  const fetchSavedRepresentatives = () => {
    setSavedRepresentatives([
      //FETCH CALL HERE
    ]);
  };

  const fetchSavedEOs = () => {
    setSavedExecutiveOrders([
      //FETCH CALL HERE
    ]);
  };

  return (
    <div className="user-profile-container">
      <div className="quadrant">
        <h2>User Information</h2>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>State: {userInfo.state}</p>
        <p>Zip Code: {userInfo.zip}</p>
        <NavLink to="/update">
          <button>Edit Profile</button>
        </NavLink>
      </div>

      <div className="quadrant">
        <h2>Local Representatives</h2>
        <ul>
          {localRepresentatives.map((rep, index) => (
            <li key={index}>
              {rep.name} - {rep.party} ({rep.state})
            </li>
          ))}
        </ul>
      </div>

      <div className="quadrant">
        <h2>Saved Representatives</h2>
        {/* Display saved representatives here */}
        <ul>
          {savedRepresentatives.map((rep, index) => (
            <li key={index}>{rep.name}</li>
          ))}
        </ul>
      </div>

      <div className="quadrant eo">
        <h2>Saved Executive Orders</h2>
        {/* Display saved executive orders here */}
        <ul>
          {savedExecutiveOrders.map((order, index) => (
            <li key={index}>{order.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;

  // when we click the User Profile from the /profile link on menuPopUp
  // we want to display four quadrants: User Information (with edit profile button), Local Representatives (autopopulated from zip provided), Saved Representatives, & Saved Executive Orders
  // set up state to manage data
  // fetch info