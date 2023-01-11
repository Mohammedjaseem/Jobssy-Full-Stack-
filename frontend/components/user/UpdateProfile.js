import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";

const UpdateProfile = ({access_token}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { updated, error, loading, user, clearErrors, updateProfile, setUpdated } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
    }

    if(error) {
      // if toast is already open, close it first
        toast.error(error)
        clearErrors()
    }

    if(updated){
      setUpdated(false);
      toast.success("User Updated !")
      router.push('/me')
    }
   
    }, [error, user, updated, ])

    const submitHandler = (e) => {
        e.preventDefault();
        updateProfile({ firstName, lastName, email, password}, access_token);
    };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/profile.svg" alt="register" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Profile</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input type="text" placeholder="Enter Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile; 