import React from 'react'

function Navbar(navClassName = "") {
  return (
    <div className={`${navClassName}  w-screen  columns-3 p-5 bg-orange-300 text-lg `}>
      <div>
        <ul className='columns-3 mx-5 text-center bg-black rounded m-auto text-white'>
          <li className='hover:font-bold'>Home</li>
          <li className='hover:font-bold'>About</li>
          <li className='hover:font-bold'>Contact</li>
        </ul>
      </div>
      <div className='text-center font-extrabold text-4xl bg-gray-500 font-serif rounded-md'>
        Job - Board
      </div>
      <div>
        <ul className='columns-2'>
          <li className=' text-right'>
            For Employer
          </li>
          <li>
            For Candidate
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar