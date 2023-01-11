
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Recruiter = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //usestate for rec
  const [companay, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [profile_pic, setProfile_pic] = useState("");

  const router = useRouter();

  const { isAuthenticated , error, loading, register, clearErrors } = useContext(AuthContext);

  useEffect(() => {

    if(error) {
      // if toast is already open, close it first
        toast.error(error)
        clearErrors()
        // if(isAuthenticated && !loading) {
        //     router.push('/')
        // }
        // }, [isAuthenticated, error, loading])
    }})

    const submitHandler = (e) => {
        e.preventDefault();
        register({ firstName, lastName, email, password, companay, designation, });
    };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SIGN UP</h2>
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
                  <i aria-hidden className="fas fa-building"></i>
                  <input type="text" placeholder="Enter Company Name" required value={companay} onChange={(e) => setCompany(e.target.value)} />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-address-card"></i>
                  <input type="text" placeholder="Enter Designation" required value={designation} onChange={(e) => setDesignation(e.target.value)} />
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
                    required
                    value={password}
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="inputWrapper">
                  <div className="inputBox">
                    <i aria-hidden className="fas fa-upload"></i>
                    <input
                      type="file"
                      name="resume"
                      id="customFile"
                      onChange={(e) => setProfile_pic(e.target.value)}
                      required
                    />
                  </div>
                </div> */}
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                {loading ? 'Loading...' : 'Register now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Recruiter 