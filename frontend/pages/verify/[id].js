
import Layout from '../../components/layout/Layout'
// import VerifyRec from '../../components/verify/verifyRec'
import  VerifyRec from '../../components/verify/verifyRec'

import axios from 'axios'

export default function VerifyPage({data}) {
  return (
    <Layout title={data.first_name}>
        <VerifyRec data={data}/>
    </Layout>
  )
}


export async function getServerSideProps({ req, params }) {

    const res = await axios.post(`${process.env.API_URL}api/VerifyRec/${params.id}`)
  
    const data = res.data

  
    return {
      props: {
        data,
      },
    }
  
  }
  