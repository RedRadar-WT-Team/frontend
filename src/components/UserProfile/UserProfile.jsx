// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import UserDetails from "../UserDetails/UserDetails";
import LocalRepsContainer from "../LocalRepsContainer/LocalRepsContainer";
import SavedEosContainer from "../SavesEosContainer/SavedEosContainer";
import SavedRepsContainer from "../SavedRepsContainer/SavedRepsContainer";
import MenuPopUp from "../MenuPopUp/MenuPopUp";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import './UserProfile.css';

function UserProfile( {baseURL, getRepData, localReps, setDetailsTarget, getRepDetails} ) {
  const [userInfo, setUserInfo] = useState({});
  const [savedRepresentatives, setSavedRepresentatives] = useState([]);
  const [savedExecutiveOrders, setSavedExecutiveOrders] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Track if login popup is shown]
  
  const fetchUserProfile = () => {
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
      getRepData(userInfo.data.attributes.zip, "local");
    }
  }, [userInfo]);


  // Fetch saved representatives
  const fetchSavedRepresentatives = () => {
    fetch(`${baseURL}/api/v1/representatives_users`, {
      method: "GET", 
      credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(data => {
      setSavedRepresentatives(data)
    })
    .catch(error => console.log('Error fetching saved reps: ', error.message))
  };

  // Fetch saved executive orders
  const fetchSavedEOs = () => {
    fetch(`${baseURL}/api/v1/executive_orders_users`, {
      method: "GET", 
      credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(data => {
      setSavedExecutiveOrders(data)
    })
    .catch(error => console.log('Error fetching saved eos: ', error.message))
  };

  useEffect(() => {
    fetchSavedRepresentatives();
    fetchSavedEOs();
  }, [])

  return (
    <div className="user-profile-container">
      <div className="quadrant">
        <UserDetails userInfo={userInfo}/>
      </div>

      <div className="quadrant">
          <LocalRepsContainer localReps={ localReps } setDetailsTarget={setDetailsTarget} getRepDetails={getRepDetails}/>
      </div>

      <div className="quadrant">
        <SavedRepsContainer savedReps={savedRepresentatives} setDetailsTarget={setDetailsTarget} getRepDetails={getRepDetails}/>
      </div>

      <div className="quadrant">
        <SavedEosContainer savedEos={savedExecutiveOrders} />
      </div>
    </div>
  );
}

export default UserProfile;


