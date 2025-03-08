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
        console.log("json: ", json)
        if (json.errors) {
          const errorMessages = json.errors.split(", ");
          let errorObj = {};
          let errorTypes = []
  
          if (errorMessages.some((error) => error.includes("Email"))) {
            if (errorMessages.some((error) => error.includes("taken"))) {
              errorTypes.push("email")
              errorObj.email = "This email is already taken. Please use a different one.";
            } else {
              errorTypes.push("email")
              errorObj.email = errorMessages.find((error) => error.includes("Email"));
            } 
          } 
          if (errorMessages.some((error) => error.includes("Zip"))) {
            errorTypes.push("zip")
            errorObj.zip = errorMessages.find((error) => error.includes("Zip"));
          }
          if (errorMessages.some((error) => error.includes("State"))) {
            errorTypes.push("state")
            errorObj.state = errorMessages.find((error) => error.includes("State"));
          }
          
          if (errorTypes.length > 1) {
            setErrorMessage({
              type: "multiple",
              message: "More than one of these fields contain errors. Please check your inputs."
            });
          } else if  (errorTypes.length === 1) {
            setErrorMessage({
              type: errorTypes[0],
              message: errorObj[errorTypes[0]], 
            });
          } else {
            setErrorMessage({
              type: "general",
              message: json.errors,
            });
          }
        }
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