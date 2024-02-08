
import { useEffect, useState } from 'react';
import './App.css';
import {  io } from "socket.io-client";
//client icin socket.io-client npm package si indrilirken, backend icin ise socket.io library si indirilecektir

function App() {

  const serverURL = `http://localhost:3002`;



  //BAckend server-url i kullanacagiz burda, yani socketio server i olusturdgumz url-endpoint diyebiliriz..
  const socket = io.connect(serverURL);
  //Artik socket imiz in hangi server a baglanacagi da client tarafindan soyledkten sonra, artik emmit, veya on(listen islemi yapabiliriz)

  //Her bir sayfa refresh edildiginde yeni den baglanti kuruluyor socket-io ile ve socket-server refresh yapilan client a y eni bir uniq id atamasi yapiyor...Ayrica da her bir farkli client icinde uniq-id atamasi yapiyor
  const [message, setMessage] = useState("");

  const [messageReceived, setMessageReceived] = useState("");  
  let [messages, setMessages] = useState([]);

  //!We emit to the mesage first from frontend to the backend(socket-server), and socket-server is listening to the event which is emmited, and socket-io recevite to the data from fontend, and after that socket-server emit the data which is received to all clients..And ever single client can listen and get the data which comes from different clients on livelly, or real time..

  //!Client gonderir datayi yani emit eder(socket.emit("send_nessage", {data})) data yi socket-server a clienttan, socket server once emit edilen event ismi ne ise o event i socket.on("eventname") ile dinelyerek, data yi 2.parametreden alir ve bu dinledigi event icnde de bir de emit islemi yaparak frontendden aldigi data yi socket-server a baghlanti kurmus, yani bu uygulamayai farkli browser, cihaz veya platformda kullanian tum kulllaniclara ayni anda real-tim e olarak iletecektir
  
  //!Multiplayer online game olusturabiliriz, discourt clone, chat, 

let [room, setRoom] = useState("");

  const joinRoom = () => {
    if(room !== "")
    {
      socket.emit("join_room", room);
    }
  }
  //!Room gonderiliyor ilk olarak, room number joiin room a tiklayarak, ve her kes girecegi oda numarasini vererek giriyor
  //!Sonra da her mesaj gonderildiginde ayni room numarasi ile gonderilir..Buraya DIKKAT!!!!

  const handleChange = (event)=>{
    let value = event.target.value;
    setMessage(value);
  }

  const sendMessage = (event)=>
  {
    console.log("messsage: ", message);
    //Herhangi bir clientta gerceklesen bir olayi, diger clientlara aninda aktarmak icin emit kullaniriz, server uzerinden diger clientlara aninda a yni aynia gibi direk yansitir.Yani backend araci bir katman gibi calisir..
    socket.emit("send_message", { message, room })
    //1.parametre event ismi, 2.parametr ise o event ile gonderilecek olan data dir
    //Burda yazilan messaj gonderiliyor, dikkat socket.emit sayesinde gonderiyoruz....
  }

  //Her ne zaman ki yeni bir mesaj gelirse bizim haberimiz olacak
  useEffect(()=>{

    socket.on("receive_message", (data)=>{
        console.log(`MESSAGES:  ${data.message}`)
        setMessageReceived(data.message);
        setMessages(currentMsgs=>[...currentMsgs,data.message]);
      //  alert(data.message);
    })

  },[socket])
//dizi icerisine yazdigmz, degisken her degistiginde useEffect icerdeki callback methodu tetikleyecektir...VE burda da socket i biz dizi icine koydugmzda socket-server a bagli olan clientlardan herhang i bir mesaj gonderdiginde, aninda burdaki socket tetiklenecektir cunku clientlar taraindan gonderilen mesajlar anindan broadcast.emmit ile tum clientlara gonderiliyor...
//useEffect icinde biz, socket-server da emit ile olusturulan methodu dinleyecegiz...
//Tum yazilanlari, tum clientlarin yazdigi mesajlari, hem kendi mesajlari hem digerlerinin yazdigi mesajlari alabiliyor

//!Cok kritik oneme sahip birsey daha var socket-io da, o da socket-server a baglanan client lar arasindan mesela tum clientlarin gormesini istemedigimz ornegin 20 client socket-io ya baglanmis ama bunlardan 5 tanes i developer ve onlar arasinda sadece gozukmesini istgedigmiz bir mesajlasma programi yapacagiz ayni channel-ozel developer kanali gibi o zaman da onlari icin room olusturabiliyoruz, sadece belirli kisilere ozel gruplar, odalar olusturup onlarin kendi aralarinda real-time mesajlasma haberlesmelerini sglayabilirz. Bir oda numarasi verilir ve o odaya giren herkes ayni oda numarasini girerler, ve farkli oda numarasindaki kullanicilar birbirlerinin mesajlairni goremezler
//!Ya da , ornegin spesifik 2 ksiinin kendi arasinda haberlesmesini saglayabiliirz
//!Ya da bizim yaptgigmz gibi bir tarafindan yazilan mesaj broadcast araciligi ile anindan herkese ulasmasini da saglayabiliriz

  return (
    <div className="App">
      <input placeholder='Room number' onChange={(event)=>setRoom(event.target.value)}/>
      <button onClick={joinRoom}>Join Room</button>
      <input onChange={handleChange} placeholder='Message...'/> 
      <button onClick={sendMessage}>Send Message</button>  

      <h1>Message:</h1>
      <div>{messageReceived}</div>

    
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
