import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
//Burasi mesaj gonderdgimz ve mesaji aldigmz yerdir
const Chat = ({socket, username, room}) => {

  const [currentMessage,setCurrentMessage] = useState("");
  const [messageList, setMessageList ] = useState([]);//Mesajlari array icerisinde tutacagiz

//!Burda async-await kullanmak cook onemli..bunu iyice dinleyhip anlamaya calisalim
  const sendMessage = async () =>
  {
    if(currentMessage !== "")
    {
      const messageData = { message:currentMessage, room, author:username, time:`${new Date(Date.now()).getHours()} :  ${new Date(Date.now()).getMinutes()}  `};

      await socket.emit("send_message", messageData); 
      setMessageList((currMsgList=>[...currMsgList, messageData]));
      setCurrentMessage("");
    }
   
  }

  //!Burda suna dikkat edelim, ilk olarak herkes oda ya katilmali, yani isimlerini ve oda numnaralarini herkes ilkl once kaydedecek ondan sonra mesjalasma baslayacaktir....Bu sekilde yaparsak calisacaktir


//!Simdi bu genellikle artik klasiklesmistir, yani useEffect ile useEffect in array ine de socket i vererek, anlik olarak orda bir degisklik oldugunda tetiklen demis olacagiz...COOK ONEMLI....Yani socket te herhangi bir ddegisikliklik oldugunda tetiklen
  useEffect(()=>
  {
    /*
    By using socket.off("receive_message") before socket.on("receive_message", ...), you effectively reset the event listeners for "receive_message" each time this code is executed, which is particularly useful in components that might be mounted or rendered multiple times in your application's lifecycle.
    */
    socket.off("receive_message").on("receive_message",  (data)=>{
      //!data socket-server dan gelecek olan data
      console.log("data:client: ", data)
      setMessageList((currMsgList=>[...currMsgList, data]));
      //Biz onceki gelen mesajlari da korumak istiyoruz, onlari kaybetmek istemiyoruz..
    })
  }, [socket])

  //Kisinin kendi gonderdigi mesajlar solda, diger kullanicilardan gelen mesajlar sagda olacak
  return (
    <div className='chat-window'>
         <div className='chat-header'>
          <p>Live Chat</p>
          </div>   
         <div className='chat-body'>
         <ScrollToBottom className='message-container'>
           {messageList.length > 0 && messageList.map((msg,index)=>{
              return (<div key={index} className='message' id={username === msg.author ? "you" : "other" }>
                        <div>
                          <div className='message-content'>
                            <p>{msg.message}</p>
                          </div>
                          <div className='message-meta'>
                            <p id="time">{msg.time}</p>
                            <p id="author">{username === msg.author ? username : msg.author}</p>
                          </div>
                        </div>
              </div>)
           })}
           </ScrollToBottom>
        </div>   
         <div className='chat-footer'>
            <input value={currentMessage} onChange={(event)=>setCurrentMessage(event.target.value)}
            onKeyPress={(event)=> event.key === "Enter" && setCurrentMessage(event.target.value)}
            type='text' placeholder='enter message...'/>
              <button onClick={sendMessage}> &#9658; </button>
          </div>   
    </div>
  )
}

export default Chat

/*
!Otomatik olarak girilen mesajlarin asagi dogru akmasi icin, scroll ekleyecegiz bu da,  
react-library kutuphanesi kullanarak yapilacak
!adem@adem-ThinkPad-13-2nd-Gen:~/socketio/socketio3/client$ npm install react-scroll-to-bottom
*/