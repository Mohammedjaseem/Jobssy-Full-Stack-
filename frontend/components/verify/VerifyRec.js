import React, { useEffect, useState, useContext } from "react";
import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";
import Loader from '../layout/Loader'
import Image from 'next/image'

const VerifyRec = ({data}) => {
  const [topic, setTopic] = useState("");

  return (
    <div className="modalMask">
      <div className="modalWrapper">
      <div className="left p-5">
      <div className="rightContentWrapper">
           
            <div className="headerWrapper">
              <h3> Profile Verified </h3>
            </div>
            <table className="table table-striped mt-4">
              <tbody>
                <tr>
                  <th scope="row">Full Name</th>
                  <td>{data.first_name} {data.last_name}</td> 
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <th scope="row">Companay</th>
                  <td>{data.companay}</td>
                </tr>
                <tr>
                  <th scope="row">Designation</th>
                  <td>{data.designation}</td>
                </tr>
                <tr>
                  <th scope="row">Approval Status</th>
                  <td>{ data.is_recruiter? ("Verified Profile ✔️") : ("Not Verified" )}</td>
                </tr>
              </tbody>
            </table>

            <div className="alert alert-danger mt-4">
              <b>Note:</b> {data.first_name} {data.last_name} can post new jobs in Jobssy
            </div>
     
          </div>
          
        </div>
        <div className="right">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image src="/images/verifyuser.webp" alt="search" fill="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyRec;
