import axios from "axios";
import { Router } from "next/router";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [error, setError] = useState(null); // error message
  const [updated, setUpdated] =useState(null);
  const [uploaded, setUploaded] =useState(null);
  const [isApproved, setIsApproved] = useState(false);


  const router = useRouter();

  useEffect(() => {
    if(!user) {
        loadUser();
    }
    }, [user]);

//   login user
  const login = async ({ username, password }) => {
    try{
        setLoading(true)
        // seding requst to backend of next js
        const res = await axios.post('/api/auth/login', {
            username,
            password
        })

        if (res.data.success){

            loadUser();
            setIsAuthenticated(true);
            setLoading(false);
            router.push('/')
        }

        if (res.data.user.is_recruiter == "True"){
            setIsRecruiter(true);
        }
        else{
            setIsRecruiter(false);
        }

    }catch (error){
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

// Googlr login
//   login user
const googleAuth = async ({token}) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/google",{
        token,
      } );

      if (res.status == 200 ) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

//   load user

const loadUser = async () => {
    
    try{
        // seding requst to backend of next js
        const res = await axios.get('/api/auth/user')
        console.log(res)
        if (res.data.user){
            setIsAuthenticated(true);
            setLoading(false);
            setUser(res.data.user)
        }
       
        if (res.data.user.is_recruiter == "True"){
            setIsRecruiter(true);
        }
        
        if (res.data.user.is_approved == "True"){
            setIsApproved(true);
        }

    }catch (error){
        setLoading(false)
        setIsAuthenticated(false);
        setIsRecruiter(false);
        setUser(null);
        setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

//  logout user 
  const logout = async () => {
    
    try{
        // seding requst to backend of next js
        const res = await axios.post('/api/auth/logout')
        console.log(res)
        if (res.data.success){
            setIsAuthenticated(false);
            setIsRecruiter(false);
            setUser(null)
        }
       

    }catch (error){
        setLoading(false)
        setIsAuthenticated(false);
        setIsRecruiter(false);
        setUser(null);
        setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }


  //   Register  user
  const register = async ({ firstName, lastName, email, password, companay, designation }) => {
    try{
        setLoading(true)
        const res = await axios.post(`${process.env.API_URL}api/register/`, {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            companay,
            designation,
        })

        if (res.data.username){
            setLoading(false);
            router.push('/login')
        }

    }catch (error){
        console.log(error, "error coool hereee")
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

//   Update  user
const updateProfile = async ({ firstName, lastName, email, password},  access_token) => {
    try{
        setLoading(true)
        const res = await axios.put(`${process.env.API_URL}api/me/update/`, {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        },{
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data){
            setLoading(false);
            setUpdated(true)
            setUser(res.data)
        }

    }catch (error){
        console.log(error, "error coool hereee")
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

//  Upload resume
const uploadResume = async (formData, access_token) => {
    try{
        setLoading(true)
        const res = await axios.put(`${process.env.API_URL}api/upload/resume/`, 
            formData,
        {
            headers:{
                Authorization: `Bearer ${access_token}`,
            },
            }
        );

        if (res.data){
            setLoading(false);
            setUploaded(true);
        }

    }catch (error){
        console.log(error, "error coool hereee")
        setLoading(false)
        setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

//   clear errors after it shows ( as a part of good habit in coding )
const clearErrors = () => {
    setError(null)
}



  return (
    <AuthContext.Provider
        value={{
            loading,
            setLoading,
            user,
            error,
            isAuthenticated,
            updated,
            uploaded,
            setUploaded,
            login,
            logout, 
            register,
            updateProfile,
            clearErrors,
            setUpdated,
            uploadResume,
            isRecruiter,
            isApproved,
            googleAuth,
        }}
    >
        {children}
    </AuthContext.Provider>
    )

} 

export default AuthContext;