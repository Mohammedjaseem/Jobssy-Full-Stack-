import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "next/router";

import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { loading, user, logout, isRecruiter, isApproved } =
    useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const router = useRouter()
  const logoutHandler = () => {
    logout();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(keyword, location);
    if (keyword) {
      let searchQuery = `/?keyword=${keyword}`;

      // if (location) searchQuery = searchQuery.concat(`&location=${location}`);

      router.push(searchQuery);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">ssy</span>
          </div>
        </Link>

        <>
          <form className="formclassed" onSubmit={submitHandler}>
            <input
              className="inputSearchClass"
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              
            />
            {/* <button className="buttonSearch" type="submit"><i class="fa fa-search"></i></button> */}
          </form>
        </>

        <div className="btnsWrapper">
          {isRecruiter ? (
            isApproved ? (
              <Link href="/employeer/jobs/new">
                <button className="postAJobButton">
                  <span>Post A Job</span>
                </button>
              </Link>
            ) : (
              <Link href="#">
                <button className="postAJobButton">
                  <span>Waiting list</span>
                </button>
              </Link>
            )
          ) : (
            <Link href="/recuriterRegister">
              <button className="postAJobButton">
                <span>Register as Rec</span>
              </button>
            </Link>
          )}

          {user ? (
            <div className=" dropdown ml-3">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>
                  Hi, {user.first_name} {user.last_name}
                </span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {isRecruiter ? (
                  <Link href="/employeer/jobs">
                    <p className="dropdown-item">My Jobs</p>
                  </Link>
                ) : (
                  <div hidden> </div>
                )}

                <Link href="/me/applied">
                  <p className="dropdown-item">Jobs Applied</p>
                </Link>

                <Link href="/me">
                  <p className="dropdown-item">Profile</p>
                </Link>

                <Link href="/upload/resume">
                  <p className="dropdown-item">Upload Resume</p>
                </Link>

                <Link href="/">
                  <p className="dropdown-item" onClick={logoutHandler}>
                    Log out
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
