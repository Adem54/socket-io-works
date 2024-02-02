
import { useEffect, useState } from 'react';
import './App.css'
import {io} from "socket.io-client";


//Burda socket-io nun client paketini cekmemiz gerekiyor...
//Client tarafinda da socket-io yu kuracagiz tabi ki npm i socket.io-client
//Bu paket sayesinde client tarafindan istek yaparak baglanabilecegiz

function App() {


  const serverURL = `http://localhost:3001`;
  //Server url e baglanmasi gerekecek, yani burda socket-io nun bulundugu server ip-domain address ve port numarasi girilmesi gerekiyor client tarafindan baglanilabilmesi icin
  const socket = io(serverURL);

  const [isConnected,  setIsConnected ] = useState(false);


  useEffect(()=>{
      function onConnect () {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);

      }

      //Baglanti durumunu burda gerceklestiriyoruz
      socket.on("connect", onConnect );
      socket.on("disconnect", onDisconnect );

      //return deyip clean up islemi yapmamiz gerekiyor ki, boyle yaparsak hem component tarafi daha az yourulur hem de server tarafi daha az yorulur 
      //socket.off ile o componentte dinlenilen herhangi bir event var ise onu bu componentten kaldirilmasini saglar
      //Bu componentten cikildiginda ne kadar baglanti var ise bunlarin kapatlmasi gerekiyor..BURASI KRITIK ONEME SAHIP
      //Bu sadece socket icin degil, abone oldugmz ne kadar farkli service ler var ise onlari burda kaldirmamiz gerekiyor
      //DIKKAT EDELIM BIZ connect-disconnect i dinliyoruz bu componentte bu eventleri dinliyoruz o zaman her iki event i de dinlenilen ne kadar event var ise kaldirmamiz gerekiyor
      return ()=>{
        socket.off("connect")
        socket.off("disconnect")
      }
  }, [])

  return (
    <>
      <h1>Socket-Server-Status:</h1>
      <p>Socket-Status {isConnected ? <strong> Connected</strong> : <b>Disconnected</b>}</p>
    </>
  )
}

export default App

//Bunlmari yaptiktan sonra once server tarafini ayaga kaldirizi calistirirz ardindan da client tarafini calistiririz