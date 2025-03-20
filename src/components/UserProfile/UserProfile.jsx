// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './UserProfile.css';

function UserProfile( { baseURL } ) {
  const [userInfo, setUserInfo] = useState(null);
  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Track if login popup is shown]

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`${baseURL}/api/v1/profile`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.data.attributes); // Assuming you're using a serializer for the user object
        console.log("data: ", data.data.attributes);
      } else {
        // Handle error if the user is not logged in
        setShowLoginPopup(true);
        console.log("Please log in to view your profile.");
      }
    };

    fetchUserProfile();
  }, [baseURL]);

  // Fetch local representatives based on the user's zip code
  useEffect(() => {
    if (userInfo && userInfo.zip) {
      fetchLocalRepresentatives(userInfo.zip);
    }
  }, [userInfo]);

  // Fetch local representatives 
  const fetchLocalRepresentatives = (zip) => {
    fetch(`${baseURL}/api/v1/representatives/search?db=false&query=${zip}`)
    .then(response => response.json())
    .then(data => {
      console.log("Local representatives data: ", data.data);
      setLocalRepresentatives(data.data);  
    })
    .catch(error => console.error("Error fetching local representatives:", error));
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
        {showLoginPopup && (
          <div className="login-popup">
            <p>Please log in to view your profile.</p>
            {/* You can implement a LoginPopUp component or redirect user to the login page */}
          </div>
        )}

    <div className="quadrant">
      <h2>User Information</h2>
      {userInfo ? (
        <div>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>State:</strong> {userInfo.state}</p>
          <p><strong>Zip Code:</strong> {userInfo.zip}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <NavLink to="/update">
        <button>Edit Profile</button>
      </NavLink>
    </div>

    <div className="quadrant">
      <h2>Local Representatives</h2>
      {localRepresentatives.length > 0 ? (
        <ul>
          {localRepresentatives.map((rep, index) => (
            <li key={index}>
              <img src={rep.attributes.photo_url} alt={rep.attributes.name} width="50" height="50" />
              <div>
                <p><strong>{rep.attributes.name}</strong></p>
                <p>Party: {rep.attributes.party}</p>
                <p>Phone: {rep.attributes.phone}</p>
                <p>Area: {rep.attributes.area}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No local representatives found.</p>
      )}
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

