
import Layout from '../components/layout/Layout'
import Recruiter from '../components/auth/Recruiter'

import axios from 'axios'

export default function RegisterPage({data}) {
  return (
    <Layout title='Register Now '>
        <Recruiter />
    </Layout>
  )
}