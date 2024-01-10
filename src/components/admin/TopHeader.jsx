import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { MdLogout } from 'react-icons/md';

const TopHeader = () => {
  return (
    <div>
      <div className="container mx-auto m-2">
        <Link to={"/admin"} className='flex text-xl items-center justify-end no-underline text-red-700 gap-2'>
            {/* <MdLogout /> */}
            <FaRegUser/>
            Chiqish
        </Link>
      </div>
    </div>
  )
}

export default TopHeader
