import axios from "axios";
import { useState, createContext } from "react";


const JobContext = createContext();


export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // error message
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(false);
  const [emailsent, setEmailsent] = useState(false);




   //  Create a new job
const newJob = async (data, access_token) => {
    try{
        setLoading(true)
        const res = await axios.post(`${process.env.API_URL}api/jobs/new/`, 
        data,
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data){
            setLoading(false);
            setCreated(true);
        }

    }catch (error){
        console.log(error)
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        // setError("You have already applied to this job")
    }
  }


    //   Update job
const updateJob = async (id, data, access_token) => {
    try{
        setLoading(true)
        const res = await axios.put(`${process.env.API_URL}api/jobs/${id}/update/`, 
        data,
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data){
            setLoading(false);
            setUpdated(true);
        }

    }catch (error){
        console.log(error)
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        // setError("You have already applied to this job")
    }
  }



  //  Apply to job
const applyToJob = async (id, access_token) => {
    try{
        setLoading(true)
        const res = await axios.post(`${process.env.API_URL}api/jobs/${id}/apply/`, 
            {},
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data.applied === true){
            setLoading(false);
            setApplied(true);
        }

    }catch (error){
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message || error.response.data.errors))
        // setError("You have already applied to this job")
    }
  }

  //  Deletjob
  const deleteJob = async (id, access_token) => {
    try{
        setLoading(true)
        const res = await axios.delete(`${process.env.API_URL}api/jobs/${id}/delete/`, 
        
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

            setLoading(false);
            setDeleted(true);

    }catch (error){
        console.log(error)
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        // setError("You have already applied to this job")
    }
  }


//  Check job applied
const checkJobApplied = async (id, access_token) => {
    try{
        setLoading(true)
        const res = await axios.get(`${process.env.API_URL}api/job/${id}/check/`, 
      
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

            setLoading(false);
            setApplied(res.data);


    }catch (error){
        console.log(error)
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        // setError("You have already applied to this job")
    }
  }

//  Get topic Stats
const getTopicStats = async (topic) => {
    try{
        setLoading(true)
        const res = await axios.get(`${process.env.API_URL}api/stats/${topic}/`, 
        );
            setLoading(false);
            setStats(res.data);


    }catch (error){
        console.log(error)
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        // setError("You have already applied to this job")
    }
  }



    //  mail for interview
    const mailForInterview = async (id, access_token, status, job) => {
        console.log(id)
        try{
            setLoading(true)
                const res = axios.get(`${process.env.API_URL}api/me/jobs/callForinterview/${id}/${status}/${job}`,{
                headers:{
                    Authorization: `Bearer ${access_token}`,
                    },
                 })

                setEmailsent(true);
                setLoading(false);    
        }catch (error){
            console.log(error)
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error || error.response.data.message))
        }
      }



//   clear errors after it shows ( as a part of good habit in coding )
const clearErrors = () => {
    setError(null)
}

  return (
    <JobContext.Provider
        value={{
            loading,
            error,
            updated,
            applied,
            setUpdated,
            applyToJob,
            clearErrors,
            checkJobApplied,
            stats,
            getTopicStats,
            newJob,
            created,
            setCreated,
            updateJob,
            deleted,
            deleteJob,
            setDeleted,
            mailForInterview,
            emailsent,
            setEmailsent,
        }}
    >      
        {children}
    </JobContext.Provider>
    )

} 

export default JobContext;