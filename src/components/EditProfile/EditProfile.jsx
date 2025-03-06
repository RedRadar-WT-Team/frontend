// src/components/EditProfile/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import X from '../../assets/x-symbol-svgrepo-com.svg';
import StateDropdown from '../CreateAccount/StateDropdown';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [usState, setUsState] = useState('');
  const [zip, setZip] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/v1/users/current');
        const userData = await response.json();

        if (response.ok) {
          setEmail(userData.email);
          setUsState(userData.state);
          setZip(userData.zip);
        } else {
          setErrorMessage('Failed to fetch user data. Please try again.');
        } 
      } catch (error) {
          setErrorMessage('Error fetching user data.');
        }
      };

      fetchUserData();
    }, []);

    const handleSave = async () => {
      try {
        const updatedUserData = {
          email, 
          state: usState, 
          zip,
        };

        const response = await fetch('/api/v1/users/current', {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
          setSuccessMessage('Your profile has been updated successfully!');
          setErrorMessage(null);
          navigate('/profile');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.errors || 'Failed to update profile.');
        }
      } catch (error) {
        setErrorMessage('Error updating profile. Please try again.');
      }
    };

    const closeEditProfile = () => {
      navigate('/profile');
    };

    return (
      <div className='edit_profile-page'>
        <div className='overlay'>
          <div className='edit_profile-container'>
            <h2>Edit Profile</h2>

            <button className="exit-button" onClick={closeEditProfile}>
              <img src={X} alt="Exit" />
            </button>

            <form>
            <div className='form-input-parent'>
              <div className="form-input">
              <label>Email:     </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form-input-state'>
                <label>State:        </label>
                  <StateDropdown className='state-dropdown' value={usState} onChange={(e) => setUsState(e.target.value)} />
              </div>

              <div className="form-input">
              <label>Zip code:     </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <button type="button" className="save-button" onClick={handleSave}>
              Update account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;