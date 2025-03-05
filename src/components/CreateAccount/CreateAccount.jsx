import React, { useState } from "react";
import StateDropdown from './StateDropdown';
import './CreateAccount.css';

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [usState, setUsState] = useState("");
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleZipChange = (event) => {
    const zipValue = event.target.value;
    if (!/^\d{5}$/.test(zipValue)) {
      setZipError("Zip code must be exactly 5 digits.");
    } else {
      setZipError("");
    }
    setZip(zipValue);
  };

  const handleStateChange = (event) => {
    setUsState(event.target.value);
  };

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
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Success:", json);
      setErrorMessage(null);
      setSuccessMessage("Your account has been created successfully!"); // Show success message
      resetForm(); // Reset the form fields, but not the success message
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setErrorMessage("An error occurred while creating your account. Please try again.");
      setSuccessMessage(null); // Clear success message on error
    }
  }

  return (
    <div className="create-account-page">
      <div className='overlay'>
        <div className='create-account-container'>
          <h2>Create account</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-input-parent'>
              <div className='form-input'>
                <label>Email:   </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className='form-input-state'>
                <label>State:    </label>
                  <StateDropdown className='state-dropdown' value={usState} onChange={handleStateChange} />
              </div>
              <div className='form-input'>
                <label>Zip code:   </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    pattern="[0-9]{5}"
                    title="Zip code should be 5 digits"
                  />
                  {zipError && <p style={{ color: 'red' }}>{zipError}</p>}
              </div>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <button className='submit-button' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;