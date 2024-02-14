
import { useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
import Chat from './Chat';


const serverURL = "http://localhost:3003";//socket-io server url
const socket = io.connect(serverURL);
  //Simdi bu iki satiri yazip biz, socket-server a baglandigmz anda, socket-server da connection durumunu dinleyen, method tetiklenmis oldu ve ilk baglatni gerceklestirilmis oldu, bunu server tarafindaki console.log mesajindan anlayabiliirz

  function App() {
  
  const [username, setUsername ] = useState("");
  const [room, setRoom ] = useState("");
  const [showChat, setShowChat] = useState(false);



  //!Simdi surayi iyi anlayalim, biz browser in network kismini takip edecek olursak herhangi bir request goremeyiz.., joinRoom butonuna tiklayarak, bir kullanici chat room a katildiginda, biz client-frontend den socket-server- backend e data gonderiyoruz ama, herhangi bir httprequest olmadan gonderiyoruz..COOOK ONEMLI..ISTE BU SOCKET-IO YU HTTPREUEST TEN AYIRAN VE DE 1 LEVEL DAHA ADVANCE VE ILERI SEVIYE ISLEMLERI YAPABILMEMIZE IMKAN SAGLAYAN BIR LIBRARYDIR...
const joinRoom = () =>
{

  if(username !== "" && room !== "")
  {
    socket.emit("join_room", { username, room });//username ve room data sini godneriyoruz
    //!Oncelikli olarak join_room isminde bir event socket-server da dinlenmeye baslar(socket.on("join_room"), ()=>{}) seklinde ki, client tarafindan room a katilacak user lar, katildiginda, hemen bu socket-server tarafindan farkledilmesi icin
    //!Client tarafindan, socket-io ya 
  }

  setShowChat(true);
}

  return (
    <div className="App">
      {/* Burda 2 kisinin arasinda yapacagi chat mesajlari ni simule ediyoruz burda ve de sundan emin olmaliyz ki her ikisi de ayni room a girdiginden emin olmaliyiz , olusturacgimz oda ya sadece, belirlenen kisiler girebilecek ve o kisiler ar asidna olacak mesajlasma...*/ }
     
     {!showChat ? 
    ( <div className='joinChatContainer'>
        <h3>Join a Chat</h3>
        <input onChange={(event)=>setUsername(event.target.value)} type='text' placeholder='John...'/>
        <input onChange={(event)=>setRoom(event.target.value)} type='text' placeholder='ROOM ID...'/>
        <button onClick={joinRoom}>Join a Room</button>
      </div>)
      :
    (  <Chat socket={socket} username={username} room={room} />)
    }
      
    </div>

  );
}

export default App;
