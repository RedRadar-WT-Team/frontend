import React, { useState } from "react";
import StateDropdown from './StateDropdown';

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [usState, setUsState] = useState("");
  const [zip, setZip] = useState("");
  //email, state, zip_code-- don't need username (yet?)
  const [zipError, setZipError] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
    setEmailError("");
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
      const response = await fetch("http://localhost:3000/create_account", {
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
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setErrorMessage("An error occurred while creating your account. Please try again.");
    }
  };

  return (
    <div className="create-account-page">
      <h2>Create account</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </label>

        <label>State:
          <StateDropdown value={usState} onChange={handleStateChange} />
        </label>

        <label>Zip code:
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            pattern="[0-9]{5}"
            title="Zip code should be 5 digits"
          />
          {zipError && <p style={{ color: 'red' }}>{zipError}</p>}
        </label>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit">Create Account</button>
      
      </form>
    </div>
  );
}

export default CreateAccount;