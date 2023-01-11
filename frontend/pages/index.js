
import Home from '../components/Home'
import Layout from '../components/layout/Layout'

import axios from 'axios'

export default function Index({data}) {
  return (
    <Layout>
      <Home data={data}/>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {

  const jobType = query.jobType || '';
  const education = query.education || '';
  const experience = query.experience || '';
  const salary = query.salary || '';
  const keyword = query.keyword || '';
  const location = query.location || '';
  // if page is not defined then set it to 1 and also if page is 2 then it will be page=1 so we need to set it to 1
  const page = query.page || 1;

  // salary min and max
  let min_salary = '';
  let max_salary = '';

  if(query.salary) {
    const [min, max] = query.salary.split('-');
    min_salary = min;
    max_salary = max;
  }

  // if fiterig i done on page 2 then it will be page=1 so we need to set it to 1


  const queryStr = `keyword=${keyword}&location=${location}&page=${page}&education=${education}&jobtype=${jobType}&min_salary=${min_salary}&max_salary=${max_salary}&experience=${experience}`

  const res = await axios.get(`${process.env.API_URL}api/jobs/?${queryStr}`)

  const data = res.data

  return {
    props: {
      data,
    },
  }

}


