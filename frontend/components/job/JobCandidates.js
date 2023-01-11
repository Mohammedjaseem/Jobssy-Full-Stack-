import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { toast } from "react-toastify";

import JobContext from "../../context/JobContext";

import Link from "next/link";
import DataTable from "react-data-table-component";

import { isAuthenticatedUser } from "../../utils/isAuthenticated";

import PopUpModal from "../modal/PopUpModal";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";

const JobCandidates = ({ candidatesApplied, access_token }) => {
  const [user, setUser] = useState(null);
  const { mailForInterview, emailsent } = useContext(JobContext);

  const [notified, SetNotified] = useState(false);
  

  const columns = [
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Candidate",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Candidate Resume",
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.appliedAt,
    },
    {
      name: "Actions",
      sortable: true,
      selector: (row) => row.Actions,
    },
  ];

  const mailForInterviewHandler = (user, status, job) => {
    mailForInterview(user, access_token, status, job);
    SetNotified(true);
    
  };

  useEffect(() => {
    if (emailsent) toast.success("User Notified");
    SetNotified(false);
  }, [notified]);

  const modalHandler = (user) => {
    setUser(user);
  };

  const data = [];

  candidatesApplied &&
    candidatesApplied.forEach((item) => {
      data.push({
        title: item.job.title,
        id: (
          <Button
            block
            className="mt-2 mb-2 rounded"
            color="info"
            onClick={() => modalHandler(item?.user)}
            type="button"
          >
            {item.user.first_name + " " + item.user.last_name}
          </Button>
        ),
        salary: item.salary,
        resume: (
          <Link
            href={`http://127.0.0.1:8000/media/${item.resume}`}
            target="_blank"
          >
            <div className="text-success text-center ml-4" rel="noreferrer">
              <b>
                <i aria-hidden className="fas fa-download"></i> View Resume
              </b>
            </div>
          </Link>
        ),
        appliedAt: item.appliedAt.substring(0, 10),
        Actions: (
          <>
          {item.status==null ? (
            <>
            <h5>Not yet reviewd</h5>
            <button
              className="btn btn-success mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "selected", item.job.id)
              }
            >
              <i className="fa fa-envelope"></i>
            </button>
            <button
              className="btn btn-danger mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "rejected", item.job.id)
              }
            >
              <i className="fa fa-times"> </i>
            </button>
            </>
          ):(
            <></>
          )}
          {item.status==true ? (
            <>
            <h5>Selected Canidate</h5>
            <button
              className="btn btn-success mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "selected", item.job.id)
              }
            >
              <i className="fa fa-envelope"></i>
            </button>
            <button
              className="btn btn-danger mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "rejected", item.job.id)
              }
            >
              <i className="fa fa-times"> </i>
            </button>
            </>
          ):(
            <></>
          )}
          {item.status==false ? (
            <>
            <h5>Rejected Canidate</h5>
            <button
              className="btn btn-success mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "selected", item.job.id)
              }
            >
              <i className="fa fa-envelope"></i>
            </button>
            <button
              className="btn btn-danger mx-1"
              onClick={() =>
                mailForInterviewHandler(item.user.email, "rejected", item.job.id)
              }
            >
              <i className="fa fa-times"> </i>
            </button>
            </>
          ):(
            <></>
          )}
          
            
          </>
        ),
      });
    });

  return (
    <>
      {user && <PopUpModal user={user} key={user?.email} onClose={() => setUser(null)} />}
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 mt-5">
          <h4 className="my-5">
            {candidatesApplied &&
              `${candidatesApplied.length} Candidates applied to this job`}
          </h4>
          <DataTable columns={columns} data={data} pagination responsive />
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default JobCandidates;
