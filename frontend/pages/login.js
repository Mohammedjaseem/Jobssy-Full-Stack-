
import Layout from '../components/layout/Layout'
import Login from '../components/auth/Login'

import axios from 'axios'

export default function LoginPage({data}) {
  return (
    <Layout title='Login '>
        <Login />
    </Layout>
  )
}