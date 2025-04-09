import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className="flex flex-col   sm:flex-row items-center justify-around gap-2 sm:gap-0  py-5 w-100vw  bg-green-300 shadow-md ">
      {/* <Image src='/logo.png' width={100} height={100} alt="Logo" /> */}
      <span className="text-3xl font-bold">RecycleHub.</span>
      <p className="pt-4 text-sm ">
        All rights reserved. Copyright @RecycleHub
      </p>
      <div className="flex gap-4 p-2">
  <FontAwesomeIcon icon={faInstagram} className=" w-6 h-6" />
  <FontAwesomeIcon icon={faTwitter} className=" w-6 h-6" />
  <FontAwesomeIcon icon={faFacebook} className=" w-6 h-6" />
</div>

    </div>
  )
}

export default Footer