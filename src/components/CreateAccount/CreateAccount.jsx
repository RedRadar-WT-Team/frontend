import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StateDropdown from './StateDropdown';
import './CreateAccount.css';
import X from '../../assets/x-symbol-svgrepo-com.svg';


function CreateAccount({baseURL}) {
  const [email, setEmail] = useState("");
  const [usState, setUsState] = useState("");
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleStateChange = (event) => setUsState(event.target.value);
  const handleZipChange = (event) => setZip(event.target.value);

  const resetForm = () => {
    setEmail("");
    setUsState("");
    setZip("");
    setZipError("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      state: usState,
      zip,
    };

    await createAccount(formData);
  };

  async function createAccount(formData) {
<<<<<<< HEAD
    fetch(`${baseURL}/api/v1/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          // Throw error if response status is not OK
          return response.json().then((json) => {
            throw new Error(`Error: ${json.errors || response.statusText}`);
          });
        }
        return response.json(); // Parse the response if OK
      })
      .then(data => {
        console.log('Created user:', data);
        setSuccessMessage("Your account has been created successfully!");
        resetForm(); // Reset form after successful account creation
        setErrorMessage(null); // Reset any previous error messages
      })
      .catch(error => {
        console.log('Create user error:', error.message);
        setErrorMessage({ general: error.message });
      });
  }

  const closeCreateAccount = () => {
    setIsOpen(false);
    navigate('/');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="create-account-page">
      <div className='overlay'>
        <div className='create-account-container'>
          <h2>Create account</h2>
          <button className='exit-button' onClick={closeCreateAccount}>
            <img src={X} alt="exit"/>
          </button>
          <form onSubmit={handleSubmit} noValidate>
            <div className='form-input-parent'>
              <div className='form-input'>
                <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
              </div>
              <div className='form-input-state'>
                <StateDropdown className='state-dropdown' value={usState} onChange={handleStateChange} />
              </div>
              <div className='form-input'>
                <label>Zip code:</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={handleZipChange}
                  />
              </div>
            </div>

            <button className='submit-button' type="submit">Submit</button>
          </form>

          {(errorMessage.message) && (
            <div className="error-messages">
              <p style={{ color: 'red'}}>{errorMessage.type === "multiple" ? "More than one of these fields contain errors. Please check your inputs." : errorMessage.message}</p>
            </div>
          )}

          {successMessage && <p className="success-message" style={{ color: 'green'}}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}


export default CreateAccount;