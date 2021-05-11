import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((auth) => {
        //successful creation
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login-container">
        <h1>Sign In</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login-registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
