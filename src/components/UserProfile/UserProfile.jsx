// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import MenuPopUp from "../MenuPopUp/MenuPopUp";
import './UserProfile.css';

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Track if the user is logged in
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Track if login popup is shown

  // Check login status when the component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/status', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',  // Include credentials (cookies) for session-based auth
        });

        const data = await response.json();

        if (data.logged_in) {
          setIsLoggedIn(true);
          setUserInfo(data.user);  // Set the user information if logged in
        } else {
          setIsLoggedIn(false);
          setShowLoginPopup(true);  // Show login popup if not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
        setShowLoginPopup(true);  // Show login popup if error occurs
      }
    };

    checkLoginStatus();
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
      { name: "Representative 1", party: "Yes", state: "NY" },
      { name: "Representative 2", party: "No", state: "NY" },
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

  if (isLoggedIn === null) {
    // Show loading state while checking login status
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    // Show the login popup if the user is not logged in
    return (
      <div>
        <h2>Please log in to view your profile.</h2>
        <NavLink to="/login">
          <button>Log In</button>
        </NavLink>
      </div>
    );
  }

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