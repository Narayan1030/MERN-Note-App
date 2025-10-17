import React from 'react'
import {Routes, Link} from "react-router"

const Navbar = () => {
  return (
    <div className='bg-black text-green-800 p-2 flex items-center justify-between m-auto border-b'>
        <h1 className='font-mono text-4xl tracking-tighter'>ThinkBoard</h1>
        <Link to="/create" className='bg-green-500 text-black px-4 py-2 rounded-3xl'><span>+</span> New note</Link>
      
    </div>
  )
}

export default Navbar
