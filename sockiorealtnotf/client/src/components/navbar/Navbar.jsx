import React, { useEffect, useState } from 'react'
import "./navbar.css";

import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";



const Navbar = ({mySocket ,  notifications, setNotifications}) => {
       const [open, setOpen] = useState(false);
    //Notification numarlari burda idi

    //!Simdi yine burasi kritik cunku bir taraftan Card.jsx de like gonderirken bir taraftan da Navbar da useEffect ile socket-server i dinlyerek, anlik olarak, dinleyerek, gelebilecek her turl mesaji farketmek icin useEffect icinde kullaniriz ve socket i de dependency array icine koyariz
    useEffect(() => {

        console.log("getNotification:clientside-useeffect");
        // const handleNotification = (data) => {
        //     console.log("getNotification-in clientside..listen from socket-server")
        //     setNotifications((prevNotifications) => [...prevNotifications, data]);
        // };
    
       mySocket.on("getNotification", (data)=>{
            console.log("getNotification-in clientside..listen from socket-server:data", data);
            setNotifications((prevNotifications) => [...prevNotifications, data]);
        });
    
        // Cleanup function to remove the event listener
        return () => {
            mySocket.off("getNotification");
        };
    }, [mySocket]); // Only re-run the effect if `socket` changes
    //notification in dependency array de olmamamsi gerekiyor, sadece socket in dependency array de olmasi lazim ki, socket-server dinlensin ve o degstiginde, sadece useEffect calissin..eger useEffect birden fazla calisirsa socket-server haricinde de o zaman get_notification eventine birden fazla event-handlers calisir ve bu da setNotification in birden fazla guncellenmesini o da her guncellenmede tekrar get_notification eventine handleer olsmasina sebep olacaktir..yani inifinitvi-sonsuz bir loop olusacaktir
    /*

      setNotifications([...notifications, data]);  //This make infinite loops , don't make like this , notifications i dependency array a verdigmz zaman,tekrar tekrar guncelleyecek useEffect
    Uncaught runtime errors:
    ×
    ERROR
    Maximum call stack size exceeded
    RangeError: Maximum call stack size exceeded
        at [Symbol.hasInstance] (<anonymous>)
        at isBinary (http://localhost:3000/static/js/bundle.js:152305:104)
        at hasBinary (http://localhost:3000/static/js/bundle.js:152319:7)
        at hasBinary (http://localhost:3000/static/js/bundle.js:152326:59)
        at hasBinary (http://localhost:3000/static/js/bundle.js:152326:59)
        at hasBinary (http://localhost:3000/static/js/bundle.js:152326:59)
        at hasBinary (http://localhost:3000/static/js/bundle.js:152326:59
    
    */


    const displayNotfications = ({senderName, type}, index)=>{
          let action="";

        switch (type) {
            case 1:
            action = "liked";
            break;
            case 2:
            action = "commented";
            break;
            case 3:
            action = "shared";        
            break;
        
            default:
            break;
        }    

        return ( <span key={index} className='notification'>{`${senderName} ${action} your post`}</span>)

    }    
    console.log("notifications: ", notifications);

    const showNotification =()=>{
        console.log("showNotification-open: ",open);
        setOpen(!open);
    }
  return (
    <div className='navbar'>
        <span className='logo'>Notfc App</span>
        <div className='icons'>
            <div className='icon'>
                <FaBell className='not-icon iconImg' onClick={showNotification}/>
                <div className='counter'>{notifications.length}</div>
            </div>
            <div className='icon'>
                <FaMessage className='not-icon iconImg'/>
                <div className='counter'>2</div>
            </div>
            <div className='icon'>
                <IoSettingsSharp className='not-icon iconImg'/>
                <div className='counter'>2</div>
            </div>
            <div className='notifications'>
            {notifications.map((item,index)=>{
                return (open &&  displayNotfications(item ,index));
            })}
            </div>
        </div>
    </div>
  )
}

export default Navbar