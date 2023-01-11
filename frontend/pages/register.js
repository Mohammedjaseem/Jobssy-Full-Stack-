
import Layout from '../components/layout/Layout'
import Register from '../components/auth/Register'

import axios from 'axios'

export default function RegisterPage({data}) {
  return (
    <Layout title='Register Now '>
        <Register />
    </Layout>
  )
}