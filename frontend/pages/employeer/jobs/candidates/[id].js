 import Layout from "../../../../components/layout/Layout";
import axios from "axios";
import NotFound from "../../../../components/layout/NotFound";

import JobCandidates from "../../../../components/job/JobCandidates";
import { isAuthenticatedUser } from '../../../../utils/isAuthenticated'

export default function JobDCandidatesPage({
  candidatesApplied,
  error,
  access_token
}) {
  // if(error === "Not found.") return <NotFound /> // this will work  if api retrun || below code will also work
  if (error?.includes("Not found.")) return <NotFound />;

  return (
    <Layout title="Job Candidates">
      <JobCandidates
        candidatesApplied={candidatesApplied}
        access_token={access_token}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {

    const access_token = req.cookies.access
    const user = await isAuthenticatedUser(access_token);
    if(!user){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    
  
  try {
    
    const res = await axios.get(`${process.env.API_URL}api/job/${params.id}/candidates/`,{
        headers:{
            Authorization: `Bearer ${access_token}`,
        },
    })

    const candidatesApplied = res.data;

    return {
      props: {
        candidatesApplied,
        access_token,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "error.response.data.detail",
      },
    };
  }

  



}
