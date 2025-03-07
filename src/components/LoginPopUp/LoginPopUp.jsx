import React, { useState } from 'react';
import './LoginPopUp.css';
import X from '../../assets/x-symbol-svgrepo-com.svg';
import { useNavigate, NavLink } from 'react-router-dom';

function LoginPopUp({ isLoginOpen, closeLogin, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleLogin = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Send the login request to the backend
    fetch(`http://localhost:3000/api/v1/users/logIn?email=${email}`)
      .then(response => {
        return response.json()
      })
      .then(data => {;
            navigate('/profile');}) // After successful login, navigate to the profile page
      .catch(error => console.log('error message: ', error.message))
  };

  return (
    <main>
      {isLoginOpen && (
        <div className='overlay'>
          <div className={`pop-up-login ${isLoginOpen ? 'open' : ''}`}>
            <div className='welcome_exit'>
              <h2>Welcome!</h2>
              <button className='exit-button' onClick={closeLogin}>
                <img src={X} alt="Close" />
              </button>
            </div>
            <div className="login_create">
              <input
                type="text"
                placeholder="Enter your email"
                className="username-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state with email input
              />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {/* Display error message if exists */}

              <button className='signin-button' onClick={handleLogin}>
                Sign In
              </button>
              <p>Don't have an account?</p>
              <button className='to-create-page'>
                <NavLink to="/create_account" className="nav-link" onClick={closeLogin}>Create one here!</NavLink>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default LoginPopUp;