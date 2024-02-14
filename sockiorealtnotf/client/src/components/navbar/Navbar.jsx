import React from 'react'
import "./navbar.css";

import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";



const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Notfc App</span>
        <div className='icons'>
            <div className='icon'>
                <FaBell className='not-icon iconImg'/>
                <div className='counter'>2</div>
            </div>
            <div className='icon'>
                <FaMessage className='not-icon iconImg'/>
                <div className='counter'>2</div>
            </div>
            <div className='icon'>
                <IoSettingsSharp className='not-icon iconImg'/>
                <div className='counter'>2</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar