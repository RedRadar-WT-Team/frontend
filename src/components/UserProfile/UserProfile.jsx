// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import UserDetails from "../UserDetails/UserDetails";
import LocalRepsContainer from "../LocalRepsContainer/LocalRepsContainer";
import MenuPopUp from "../MenuPopUp/MenuPopUp";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import './UserProfile.css';

function UserProfile( {baseURL, getRepData, localReps, setDetailTarget, getDetails} ) {
  const [userInfo, setUserInfo] = useState({});
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Track if login popup is shown]
  
  const fetchUserProfile = async () => {
    fetch(`${baseURL}/api/v1/users`, {
      method: "GET", 
      credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(data => {
      setUserInfo(data)
    })
    .catch(error => console.log('Error fetching user profile: ', error.message))
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch local representatives based on the user's zip code
  useEffect(() => {
    if (userInfo?.data?.attributes?.zip) {
      console.log(userInfo.data.attributes.zip)
      getRepData(userInfo.data.attributes.zip, "local");
    }
  }, [userInfo]);

  // Fetch local representatives from an external API
  // const fetchLocalRepresentatives = (zip) => {
    
  // };

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
        <UserDetails userInfo={userInfo}/>
      </div>

      <div className="quadrant">
          <LocalRepsContainer localReps={ localReps } setDetailTarget={setDetailTarget} getDetails={getDetails}/>
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

