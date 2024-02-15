import React, { useEffect, useState } from 'react'
import "./navbar.css";

import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";



const Navbar = ({socket}) => {
        const [ notifications, setNotifications ]=useState(0);
    //Notification numarlari burda idi

    //!Simdi yine burasi kritik cunku bir taraftan Card.jsx de like gonderirken bir taraftan da Navbar da useEffect ile socket-server i dinlyerek, anlik olarak, dinleyerek, gelebilecek her turl mesaji farketmek icin useEffect icinde kullaniriz ve socket i de dependency array icine koyariz
    useEffect(()=>{
        //Socket-server dan her yeni notification aldigmzda, notificatins i update edecegiz...setNotifications ile
        socket.on("get_notification", (data)=>{
            const { senderName, type } = data;

        })
    }, [socket])
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