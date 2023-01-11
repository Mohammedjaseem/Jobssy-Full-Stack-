import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="py-1">
    <p className="text-center mt-1">
      Jobbssy - 2022-2023, All Rights Reserved
      <Link
        className="ml-4"
        rel="noreferrer"
        target="_blank"
        href="https://jassy.in"
      >
        Get in touch with me
      </Link>
    </p>
  </footer>
  )
}

export default Footer