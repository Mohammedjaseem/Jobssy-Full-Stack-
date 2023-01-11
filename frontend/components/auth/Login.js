import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import jwt_decode from "jwt-decode";

import AuthContext from "../../context/AuthContext";

import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { isAuthenticated, error, loading, login, clearErrors, googleAuth } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      // if toast is already open, close it first
      toast.error(error);
      clearErrors();
    }
    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);


  function handleCallbackResponse(response) {
    console.log("Encoded jwt id token :", response.credential);
    var userObject = jwt_decode(response.credential);
    var token = response.credential
    googleAuth({token})
    console.log(userObject)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "93852099180-kiefncnoualt1ggvr49mab8sgmgvmhdq.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <div className="modalMask">
      <div className="modalWrapperRe">
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> LOGIN</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    title="your email is invaild"
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                New to Jobbee? <Link href="/register">Create an account</Link>
              </p>
              
            </form>
            <div id="signInDiv" className="d-flex mt-5 items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
