// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import MenuPopUp from "../MenuPopUp/MenuPopUp";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import './UserProfile.css';

function UserProfile( {baseURL} ) {
  const [userInfo, setUserInfo] = useState(null);
  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Track if login popup is shown]

  useEffect(() => {
    const fetchUserProfile = async () => {
      fetch(`${baseURL}/api/v1/profile`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUserInfo(data)
        console.log(data)
      })
      .catch(error => console.log('Error fetching user profile: ', error.message))
    };

    fetchUserProfile();
  }, []);

  // Fetch local representatives based on the user's zip code
  useEffect(() => {
    if (userInfo && userInfo.zip) {
      fetchLocalRepresentatives(userInfo.zip);
    }
  }, [userInfo]);

  // Fetch local representatives from an external API
  const fetchLocalRepresentatives = (zip) => {
    setLocalRepresentatives([
      localRepresentatives
    ]);
  };

  // Fetch saved representatives (example)
  const fetchSavedRepresentatives = () => {
    setSavedRepresentatives([
      { name: "Saved Representative 1" },
      { name: "Saved Representative 2" },
    ]);
  };

  // Fetch saved executive orders (example)
  const fetchSavedEOs = () => {
    setSavedExecutiveOrders([
      { title: "Executive Order 1" },
      { title: "Executive Order 2" },
    ]);
  };

  return (
    <div className="user-profile-container">
      <div className="quadrant">
        <h2>User Information</h2>
        {/* <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>State: {userInfo.state}</p>
        <p>Zip Code: {userInfo.zip}</p> */}
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
        <ul>
          {savedRepresentatives.map((rep, index) => (
            <li key={index}>{rep.name}</li>
          ))}
        </ul>
      </div>

      <div className="quadrant eo">
        <h2>Saved Executive Orders</h2>
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
  // fetch 'http://localhost:3000/api/v1/profile'
  // for now, user info to display is the last user with an id of 1 and the following info: 
  // User.create!(email: "funtimes@consultancy.com", state: "Maryland", zip: "20879")

  // display saved reps based on info pulled in the api_queried_reps.yml fixture on the BE? 

