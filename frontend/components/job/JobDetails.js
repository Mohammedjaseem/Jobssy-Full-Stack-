import React, { useEffect, useContext} from 'react'
import moment from 'moment/moment' // for date format

import JobContext from "../../context/JobContext";
import {toast} from "react-toastify";


const JobDetails = ({job, candidates, access_token}) => {

  const {applyToJob, applied, clearErrors, error, loading, checkJobApplied } = useContext(JobContext)

  const map_link = job.google_map.split('src="')[1].split('"')[0]  // to get map link from google map

  const today = new Date().toISOString().slice(0, 10) // get today's date

  

  useEffect( () => {   

    if(error){
      console.log(error)
      toast.error(error);
      clearErrors()
    }
    
    checkJobApplied(job.id, access_token)

  }, [error,applied]);

  const applyToJobHandler = () => {
    applyToJob(job.id, access_token);

  }

  const d1 = moment(job.lastDate);
  const d2 = moment(Date.now());
  const isLastDatePasses = d1.diff(d2, 'days') < 0 ? true : false;

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{job.title}</h2>
                <span>
                  <i aria-hidden className="fas fa-building"></i>
                  <span> {job.company}</span>
                </span>
                <span className="ml-4">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span> {job.address}</span>
                </span>

                <div className="mt-3">
                  <span>
                    {loading ? (
                      "Loading..."
                    ): applied? (
                      <button 
                      disabled
                      className="btn btn-success px-4 py-2 apply-btn">
                          <i aria-hidden className='fas fa-check'></i>
                          {loading ? " Loading" : " Applied"}
                       </button>
                    ): (
                      <button 
                      className="btn btn-primary px-4 py-2 apply-btn"
                      onClick={applyToJobHandler}
                      disabled={isLastDatePasses}
                      >
                      {loading ? 'Loading...' : 'Apply Now'}
                    </button>
                    )}
                    
                    <span className="ml-4 text-success">
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>
                  "{job.description}"
                </p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4 text-dark">Job Summary</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{job.jobtype}</td>
                    </tr>

                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{job.industry}</td>
                    </tr>

                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>{job.salary}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{job.education}</td>
                    </tr>

                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{job.experience}</td>
                    </tr>

                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{job.company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="job-location">
                {/* display map using link in map_link*/}
                <h4 className="mt-5 mb-4">Location</h4>
                <iframe src={map_link} width="100%" height="450" style={{border: 0}} allowFullScreen></iframe>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="job-contact-details p-3">
              <h4 className="my-4 text-dark">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{job.email}</p>

              <h5>Job Posted:</h5>
              <p>{moment.utc(job.createdAt).local().startOf('seconds').fromNow()}</p>

              <h5>Last Date:</h5>
              <p>{job.lastDate.substring(0, 10)}</p>
            </div>

            {/* if today's date is greater than last date then display this */}

            {today > job.lastDate.substring(0, 10) && (
            <div className="mt-5 p-0">
              <div className="alert alert-danger">
                <h5>Note:</h5>
                You can no longer apply to this job. This job is expired. Last
                date to apply for this job was: <b>{job.lastDate.substring(0, 10)}</b>
                <br /> Checkout others job on Jobbssy.
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails