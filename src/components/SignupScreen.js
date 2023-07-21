import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import DeleteList from "./DeleteList";
const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState(""); 
  const [choice, setChoice] = useState(""); 
  const register = (e) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
          setSignedIn(true);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
          setSignedIn(true);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleRoleSelect = (e) => {
    setRole(e.target.value);
  };

  const handleChoiceSelect = (e) => {
    setChoice(e.target.value);
  };

  return (
    <div className="signupScreen">
       {!signedIn ? (
        <form>
          <h1>Sign In</h1>
          <input ref={emailRef} placeholder="Email" type="email" />
          <input ref={passwordRef} placeholder="Password" type="password" />
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>

          <h4>
            <span className="signupScreen__gray">New to Stock_Management? </span>{" "}
            <span className="signupScreen__link" onClick={register}>
              Sign Up now
            </span>
          </h4>
        </form>
      ) : (
        <div>
          <h2>Welcome, {emailRef.current?.value || "User"}!</h2>
          <h3>Please select your role:</h3>
          <select value={role} onChange={handleRoleSelect}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          <button onClick={() => console.log("Role selected:", role)}>Continue</button>

          
          {role === "admin" && (
            <div>
              <h3>Choose an action:</h3>
              <select value={choice} onChange={handleChoiceSelect}>
                <option value="">Select Action</option>
                <option value="add">Add Product</option>
                <option value="update">Update Product</option>
                <option value="list">List Products</option>
                <option value="Delete">Delete Products</option>
              </select>
              <button onClick={() => console.log("Action selected:", choice)}>Continue</button>

              
              {choice === "add" && <ProductForm />}
              {choice === "update" && <ProductDetails />}
              {choice === "list" && <ProductList />}
              {choice === "Delete" && <DeleteList />}
            </div>
          )}

          
          {role === "staff" && <ProductList />}
        </div>
      )}
    </div>
  );
};

export default SignupScreen;
