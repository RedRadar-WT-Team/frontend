import React, { useState } from "react";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [state, setUsstate] = useState("");
  const [zip, setZip] = useState("")
  //email, state, zip_code-- don't need username (yet?)

  const handleSubmit = (event) => {
    event.preventDefault();
  }

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
        <input
          type="state"
          value={state}
          onChange={(e) => setUsstate(e.target.value)}
          required
        />
        </label>

        <label>Zip code:
        <input
          type="zip_code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
        </label>

        <input type="submit" />
      </form>


    </div>
  )
}

export default CreateAccount