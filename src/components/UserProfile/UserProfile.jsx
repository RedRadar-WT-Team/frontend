// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './UserProfile.css';
import LoginPopUp from "../LoginPopUp/LoginPopUp";

function UserProfile( { baseURL } ) {
  const [userInfo, setUserInfo] = useState(null);
  const [localRepresentatives, setLocalRepresentatives] = useState([]);
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`${baseURL}/api/v1/profile`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data.data.attributes); 
        console.log("data: ", data.data.attributes);
      } else {
        setShowLoginPopup(true);
        console.log("Please log in to view your profile.");
      }
    };

    fetchUserProfile();
  }, [baseURL]);

  // on mounting, load local & saved reps and saved EOs
  useEffect(() => {
    if (userInfo && userInfo.zip) {
      fetchLocalRepresentatives(userInfo.zip);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchSavedRepresentatives();
  }, []);

  useEffect(() => {
    fetchSavedEOs();
  }, []);


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

  // Fetch saved representatives 
  const fetchSavedRepresentatives = () => {
    fetch(`${baseURL}/api/v1/representatives_users`, {
      method: 'GET',
      credentials: 'include',  
    })
      .then(response => response.json())
      .then(data => {
        setSavedRepresentatives(data);
      })
      .catch(error => console.error("Error fetching saved representatives:", error));
  };
  
  // Fetch saved executive orders (example)
  const fetchSavedEOs = () => {
    fetch(`${baseURL}/api/v1/executive_orders_users`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setSavedExecutiveOrders(data); 
      })
      .catch(error => console.error("Error fetching saved executive orders:", error));
  };
  
  return (
    <div className="user-profile-container">
      {showLoginPopup && (
        <LoginPopUp 
          isLoginOpen={showLoginPopup} 
          closeLogin={() => setShowLoginPopup(false)} 
          setCurrentUser={setUserInfo} 
          baseURL={baseURL} 
        />
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
            <ul key={index}>
              <img src={rep.attributes.photo_url} alt={rep.attributes.name} width="50" height="50" />
              <div>
                <p><strong>{rep.attributes.name}</strong></p>
                <p>Party: {rep.attributes.party}</p>
                <p>Phone: {rep.attributes.phone}</p>
                <p>Area: {rep.attributes.area}</p>
              </div>
            </ul>
          ))}
        </ul>
      ) : (
        <p>No local representatives found.</p>
      )}
    </div>


    <div className="quadrant">
      <h2>Saved Representatives</h2>
      <ul>
        {savedRepresentatives.length > 0 ? (
          savedRepresentatives.map((rep, index) => (
            <li key={index}>{rep.name}</li>
          ))
        ) : (
          <p>No saved representatives.</p>
        )}
      </ul>
    </div>

    <div className="quadrant">
        <h2>Saved Executive Orders</h2>
        <ul>
          {savedExecutiveOrders.length > 0 ? (
            savedExecutiveOrders.map((order, index) => (
              <li key={index}>{order.title}</li>
            ))
          ) : (
            <p>No saved executive orders.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;