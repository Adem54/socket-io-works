import React, { useState } from 'react'

//Burasi mesaj gonderdgimz ve mesaji aldigmz yerdir
const Chat = ({socket, username, room}) => {

  const [currentMessage,setCurrentMessage] = useState("");

//!Burda async-await kullanmak cook onemli..bunu iyice dinleyhip anlamaya calisalim
  const sendMessage = async () =>
  {
    if(currentMessage !== "")
    {
      const messageData = { message:currentMessage, room, author:username, time:`${new Date(Date.now()).getHours()} :  ${new Date(Date.now()).getMinutes()}  `};

      await socket.emit("send_message", messageData); 
    }
   
  }

  return (
    <div>
         <div className='chat-header'>
          <p>Live Chat</p>
          </div>   
         <div className='chat-body'>
          
          </div>   
         <div className='chat-footer'>
            <input onChange={(event)=>setCurrentMessage(event.target.value)} type='text' placeholder='enter message...'/>
              <button onClick={sendMessage}> &#9658; </button>
          </div>   
    </div>
  )
}

export default Chat