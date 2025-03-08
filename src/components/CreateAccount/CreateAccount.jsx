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
    try {
      const response = await fetch(`${baseURL}/api/v1/users`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const json = await response.json();
        if (json.errors) {
          const errorMessages = json.errors.split(", ");
          let errorObj = {};
  
          errorMessages.forEach((error) => {
            if (error.includes("Email")) {
              errorObj.email = error;
            } else if (error.includes("Zip")) {
              errorObj.zip = error;
            } else if (error.includes("State")) {
              errorObj.state = error;
            }
          });
  
          setErrorMessage(errorObj);
        }
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Success:", json);
      setSuccessMessage("Your account has been created successfully!"); 
      resetForm(); 
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setSuccessMessage(null); 
    }
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

          {(errorMessage || zipError) && (
            <div className="error-messages">
              {errorMessage?.email && <p style={{ color: 'red'}}>{errorMessage.email}</p>}
              {errorMessage?.state && <p style={{ color: 'red'}}>{errorMessage.state}</p>}
              {errorMessage?.zip && <p style={{ color: 'red'}}>{errorMessage.zip}</p>}
              {zipError && <p style={{ color: 'red'}}>{zipError}</p>}
              {errorMessage && !errorMessage.zip && !errorMessage.email && !errorMessage.state && (
                <p style={{ color: 'red'}}>{errorMessage.general}</p>
              )}
            </div>
          )}

          {successMessage && <p className="success-message" style={{ color: 'green'}}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}


export default CreateAccount;