import Layout from "../../../components/layout/Layout";
import axios from "axios";
import NotFound from "../../../components/layout/NotFound";

import UpdateJob from "../../../components/job/UpdateJob";
import { isAuthenticatedUser } from '../../../utils/isAuthenticated'

export default function JobDCandidatesPage({
  job,
  access_token,
  error,
}) {
  // if(error === "Not found.") return <NotFound /> // this will work  if api retrun || below code will also work
  if (error?.includes("Not found.")) return <NotFound />;

  return (
    <Layout title="Job Candidates">
      <UpdateJob
        job={job}
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
    
    const res = await axios.get(`${process.env.API_URL}api/jobs/${params.id}/`,{
        headers:{
            Authorization: `Bearer ${access_token}`,
        },
    })

    const  job = res.data.job;

    return {
      props: {
        job,
        access_token
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
