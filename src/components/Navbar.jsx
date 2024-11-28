import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[60px] bg-white rounded-md flex justify-center items-center gap-2'>
      <img src="logo.svg" alt="" />
      <h1 className='text-2xl font-semibold'>Task Management App</h1>
    </div>
  )
}

export default Navbar
