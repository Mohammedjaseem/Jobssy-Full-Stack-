import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import Link from "next/link";


const UploadResume = ({access_token}) => {

  const [resume, setResume] = useState(null);

  const router = useRouter();

  const {   error, user, loading, uploaded, clearErrors, uploadResume, setUploaded } = useContext(AuthContext);

  useEffect(() => {
 
    if(error) {
      // if toast is already open, close it first
        toast.error(error)
        clearErrors()
    }

    if(uploaded){
        setUploaded(false)
        toast.success("Your resume is uploaded !")
        router.push('/me')
    }
   
    }, [error, uploaded ]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume)
        uploadResume(formData, access_token)

    };

    const onChange = (e) =>{
        setResume(e.target.files[0])
    }


  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

                {user && user.resume && (

                    <>
                    <h4 className="text-center my-3">OR</h4>

                    <Link href={`http://127.0.0.1:8000/media/${user.resume}`} target="_blank">
                      <div
                        className="text-success text-center ml-4"
                        rel="noreferrer"
                    >
                        <b>
                          <i aria-hidden className="fas fa-download"></i> Download
                          Your Resume
                        </b>
                    </div>
                    </Link>
                    </>

                )}

              

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? 'uploading...!' : "upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;