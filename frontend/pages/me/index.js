
import Layout from '../../components/layout/Layout'
import UpdateProfile from '../../components/user/UpdateProfile'

import { isAuthenticatedUser } from '../../utils/isAuthenticated'

import axios from 'axios'

export default function UpdateProfilePage({access_token}) {
  return (
    <Layout title='Update User Profile '>
        <UpdateProfile  access_token={access_token}/> 
    </Layout>
  )
}

export async function getServerSideProps({ req }) {

    const access_token = req.cookies.access

    const user = await isAuthenticatedUser(access_token);

    console.log("this is user value: ",user)

    if(!user){
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
