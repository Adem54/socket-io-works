
import { useState } from 'react';
import './App.css';
import {  io } from "socket.io-client";
//client icin socket.io-client npm package si indrilirken, backend icin ise socket.io library si indirilecektir

function App() {

  const serverURL = `http://localhost:3002`;



  //BAckend server-url i kullanacagiz burda, yani socketio server i olusturdgumz url-endpoint diyebiliriz..
  const socket = io.connect(serverURL);
  //Artik socket imiz in hangi server a baglanacagi da client tarafindan soyledkten sonra, artik emmit, veya on(listen islemi yapabiliriz)

  const [message, setMessage] = useState("");


  const handleChange = (event)=>{
    let value = event.target.value;
    setMessage(value);
  }

  const sendMessage = (event)=>
  {
    console.log("messsage: ", message);
    //Herhangi bir clientta gerceklesen bir olayi, diger clientlara aninda aktarmak icin emit kullaniriz, server uzerinden diger clientlara aninda a yni aynia gibi direk yansitir.Yani backend araci bir katman gibi calisir..
    socket.emit()
  }





  return (
    <div className="App">
      <input onChange={handleChange} placeholder='Message...'/> 
      <button onClick={sendMessage}>Send Message</button>  
    </div>
  );
}

export default App;
/*
Socket io da biz, bir event olustururuz bu eventleri isimlendiririz 
Ve ya bir eventi dinleriz, yani baska bir y erde yapilacak dgisikligi bekleriz ve server i dinleriz, cunku baska bir client in yaptigi degisikligi bize aninda haber verecek olan serveri dinleriz
Ya da , bir event ile yeni bir action i push ederiz server a yani dogrudan haber veririz, bak ben boyle bir degsiklik yapiyorum bunu git, server a abone olan tum clientlara da anindan haber ver diye...

emmit-send data-emmit the message
on-listen data-

socket.io nun reactta calismasi icin, npm install ile socket.io yu kurmamiz gerekiyor

*/
