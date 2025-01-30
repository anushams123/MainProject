import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/forgot-password", { email });
      setMessage(response.data);
    } catch (error) {
      setMessage("User not found.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Send Reset Link</button>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
