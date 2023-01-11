import Link from 'next/link'
import React from 'react'
import Layout from './Layout'
import Image from 'next/image'

const NotFound = () => {
  return (
    <Layout>
    <div className="page-not-found-wrapper">
    <Image src="/images/404.svg" height="550" width="550" alt="404_not_found" />

    <h5>
      Page Not Found. Go to <Link href="/">Homepage</Link>{" "}
    </h5>
  </div>
    </Layout>
  )
}

export default NotFound