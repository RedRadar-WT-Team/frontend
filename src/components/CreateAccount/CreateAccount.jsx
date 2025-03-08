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
  const [errorMessage, setErrorMessage] = useState(null);
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
                <label>Email:     </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                {errorMessage?.email && <p style={{ color: 'red' }}>{errorMessage.email}</p>}
              </div>
              <div className='form-input-state'>
                <label>State:        </label>
                  <StateDropdown className='state-dropdown' value={usState} onChange={handleStateChange} />
                  {errorMessage?.state && <p style={{ color: 'red' }}>{errorMessage.state}</p>}
              </div>
              <div className='form-input'>
                <label>Zip code:     </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={handleZipChange}
                  />
                  {zipError && <p style={{ color: 'red' }}>{zipError}</p>}
                  {errorMessage?.zip && <p style={{ color: 'red' }}>{errorMessage.zip}</p>}
              </div>
            </div>
            
            {errorMessage && !errorMessage.zip && !errorMessage.email && !errorMessage.state && (
            <p style={{ color: 'red' }}>{errorMessage.general}</p>
            )}

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <button className='submit-button' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;