import { useEffect, useState } from "react";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";





function App() {
  const [ notifications, setNotifications ]=useState([]);
  const [username, setUsername] = useState("");
  const [user, setUser ] = useState("");

  const [mySocket, setMySocket] = useState(null);

  console.log("user: ", user);
  console.log("username: ", username);

  //useEffect kullaniyoirz cunku 1 kez baglanacagiz, ilk sayfa acildiginda baglansin...diyoruz...bu onemli...
  useEffect(()=>{
    const socservURL = "http://localhost:3005";
    const socket = io.connect(socservURL);
    console.log("socketttt-App.js: ", socket);
    //Burda socket in kendine ait uniq id si vardir
    setMySocket(socket);
    
  },[])

  //!Burda ilk olarak sayfa yi acip da kullanici ismini yazacak, ve biz o kullanici ismini socket-server a gondermis olacagiz..VE username leri kaydedecigiz ki onlineuser lar i array icerisinde tutmus olacagiz bu sekilde
  //Her yeni username verisii girildiginde socket-server a o username gonderilebilsin...diye dependency array icine tetiklnmesini hangi deger degistiginde isiyorsk onlari girerirz ve burda da kullanicilari giriyoruz ki, socket-server da online kullaniclar olmali...ve o online kullanicilar arasindan kullanicilar birbirlerini bulacaklardir
  useEffect(()=>{
      mySocket?.emit("newUser", user);
  },[mySocket, user])
//!Yapacagmiz is, su client tarafinda bir kullanici ornegin bir resmi begendiginde yani heart iconuna, kalbe tiklayinca, bunu biz client-dan socket-server a gonderecegiz, sonra da bu like bilgisini sokcet-server alacak ve bunu like yapilan kullaniciyi bulup ona gonderecek.......
/*
!Send event socket-server to client: use io

!to send every client: use io.emit 
!to send one client: use io.to(socketId).emit

!Belirli bir gruba gonderirken ise : once grub icin gruba katilanlarin oda-grup nmarasi alinarak grup olustrulur..socket-server da
  socket.on("join_room", (data)=>{//Burda, join_room eventinin clientta emit ettigi method un 2.paramtresinde gonderilen data dir bu data
        const { username, room } = data;
        socket.join(room);
 !Sonra da gelen mesajlar sadece o grupdaki uyelere gonderilir       
    socket.on("send_message", (data)=>{
          socket.to(data.room).emit("receive_message", data);

!Client side: use socket

!Take event from client: !use socket.on

!Send event from client to server: use socket.emit 
!Take event from server :  use socket.on

*/

  return (
    <div className="container">
      {user ?  
      ( 
        <>
          <Navbar mySocket={ mySocket }  notifications={notifications}  setNotifications={setNotifications}/>
          {
            posts.map((post)=>{
              return <Card key={post.id} post={post} mySocket={mySocket} user={user} notifications={notifications} />
            })
          }
          <span className="username">{user}</span>
        </>
      ) 
      : 
      ( <div className="login">
          <input type="text"  onChange={event=>setUsername(event.target.value)}   placeholder="username"/>
          <button onClick={()=>setUser(username)}>Login</button>
        </div>
      )
        
        }
     
    </div>
  );
}

export default App;
//!Uygulamayi calistiririken suna dikkat edelim, giris yaparken posts data sinda ki isimlerin ayni sekilde girmeliyiz... john, monica diye cunku biz bu 2 kullanici arasinda gecen like yapma islemin simule ettik
//!BU ORNEK OZELLIKL BIZIM HYTTETJENESTE KULLANMA MANTIGINA BIRAZ BENZEDI.....YANI JOHN MONICA NIN POSTUNU BEGENDINDE ANINDA MONICA NIN NOTIFICATIONS LARINA BU SAYI OLARAK DA GELIOYR VE NOTIFICATIONS A TIKLAYINCA LISTE OLARAK KIM ONUN POSTUNU TIKLMAIS O DA  GELIYOR VE DE MONICA NIN KENDI GIRIS YAPTIGI POSTUNDA KI KENDINE AIT POSTU DA REAL-TIME OLARAK LIKED OLARAK DEGISIYOR, JOHN KENDI ISMI ILE GIRIS YAPTIGI CLIENT INDA MONICAYA AIT POSTU BEGENDIGI ANDA....
