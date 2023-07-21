import React, { useState } from "react";
import SignupScreen from "./SignupScreen";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  };

  const handleExit = () => {
    setSignIn(false);
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
      <img
          className="loginScreen__logo"
          src="https://cdn4.vectorstock.com/i/1000x1000/86/43/mountain-stock-market-icon-symbol-vector-5118643.jpg"
          alt=""
        />

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <div>
            <SignupScreen />
            <button onClick={handleExit}>Exit</button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <button onClick={() => setSignIn(true)}>Sign In</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
