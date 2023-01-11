
import Layout from '../../../components/layout/Layout'
import NewJob from "../../../components/job/NewJob"

import { isAuthenticatedUser } from '../../../utils/isAuthenticated'

import axios from 'axios'

export default function NewJobPage({access_token}) {

  return (
    <Layout title='Post a new job '>
        <NewJob access_token={access_token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

    const access_token = req.cookies.access

    const user = await isAuthenticatedUser(access_token);

    const userprofile = await axios.get(`${process.env.API_URL}api/me/`,{
      headers: {
          "Authorization": `Bearer ${access_token}`,
      },
     });
     const admin_approve = userprofile

     console.log(admin_approve?.data.is_approved) //?.data used bcz data having the objects
     
    if(!user || admin_approve?.data.is_approved === 'False'){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
      return {
        props:{
            access_token,
        },
      };
}
