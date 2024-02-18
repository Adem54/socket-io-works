import React, { useEffect, useState } from 'react'
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";

const Card = ({ post , mySocket, user, notifications}) => {

    const [liked, setLiked ] = useState(false);

    console.log("mySocket-CArddd:  ", mySocket);

    console.log("post: ", post);
    //type ise heart-type:1
   const handleLike =  (type)=>{
   //  setLiked(!liked);
    setLiked(true);
    console.log("liked: ", liked);
    console.log("post.username-Card: ", post.username);
    //!Burda suna dikkat, senderName i gonderiyourz, tikladgmiz post un user i ni zaten biz alabiliyoruz, paramtremize geliyordu zaten
    mySocket.emit("sendNotification", {
        senderName:user,
        receiverName:post.username,//hangi user a tiklandi ise, yani post lari olan user lardan hangisine tiklandi ise onu gonderecegiz...ve senderName de , bu sayfayi acip username ini girip de post lardan istedgine like koyan kisi kim ise o..
        type
    });
  
    console.log("send_notification-CArd-client-last");
   } 

   console.log("post.username-Card: ", post.username);
   console.log("notificationsssss-CARD: ", notifications);

   //Suna dikkat edelim zaten notifications array icerisine sadece bu kullaniciya ait postlar ile ilgili like, comment vs ler gelecek, yani bu kullanicinin postu like yapilmis ise sadece onlar gelecek bunu unutmayalim, ondan dolayi sundan eminiz dogrudan bu kullaniciya yapilan like lar direk o postu like yapilan kullanicya gidecek sekiklde zaten socket-server da ayarladigmz icin burda...dogrudan gelen notificationslari aliyoruz ve eminiz arrtik bir kez daha burda acaba bu kendi postu da buraya gelir mi diye veya baska birine yapilan post buraya gelir mi diye endisemiz yok artik
   const checkNotSender = (username)=>{
        if(notifications.length > 0)
        {
            const findUsername = notifications.find(sender=>sender.senderName === username);
            console.log("findUsername: ", findUsername);
            console.log("findUsername ? false : true: ", findUsername ? false : true);
            return findUsername ? false : true;
        }else{
            return false;
        }
       

   }
   //!DUSUNULEN SENARYOU ASAGIDAKI GIBI!!!!
   //!Burda planlanan senaryou su, biz posts l istesinde 2 farkli kullanicinin postunu, listelioyruz, iste 1-John 2.Monica ve uygulamaya da girildiginde ki input alaninda user olarak da bu userlar giris yapacagini varsayiyoruz ve username olrak John girilecek ve John MOnica nin postuna like koyacak, sonra da baska bir browser da Monica giris yapip John un postuna heart-kalp-like koyacak....Senaryou tam olarak bu

//!Burasi reactta socket-server i dinlerken, en onemli noktalardan bir tanesidir, useEffect te dependencies array icine socket i vererek, biz socket-server dan herhangi bir data gelir gelmez bunu almis oluyoruz aslinda...Bu coook onemli...Bunu da bilmek gerekiyor

  return (
    <div className='card'>
        <div className='info'>
            <img src={post.userImg}  alt="" className='userImg'/>
            <span>{post.fullname}</span>
        </div>
        <img src={post.postImg}  alt="" className='postImg'/>
    <div className='interaction'>
        
       { (liked ||  checkNotSender(post.username)) ?  <FaHeart onClick={()=>handleLike(1)} className='cardIcon heartIcon'/> :   <FaRegHeart onClick={()=>handleLike(1)} className='cardIcon' /> }
      
        <FaRegComment className='cardIcon' onClick={()=>handleLike(2)} />
        <FaRegShareFromSquare className='cardIcon' onClick={()=>handleLike(3)} />
        <FiInfo className='cardIcon infoIcon'  onClick={()=>handleLike(4)}/>
    </div>
    </div>
  )
}

export default Card
/*
Mantik su olacak, kullanicilardan 1 tanesi diger kullanicinin postunu heart-kalbe bazip begendiginde, bu begenin postu begenilen kullaniciinin notification iconu uzerinde 1 diye veya 2 farkli kullanici tarafindan begenilmis ise  2 diye gelecek, ama otomatik olarak gelecek, postu begenilen kullanici sayfay yenileme vs yapmadan gelecek, ve de notification larda da , kim begendi ise o kisinin begendi mesaji olacak... 
!Aslinda, socket-io nun yaptgii client-lar arasi interaktif ligi, otomatik hale getirmesi idi iste bu da, iki client arasinda veya birden fazla client arasinda anlik olarak, dikkat edelim burasi cok onemli, real-time, yani bir kullanici diger kullaniciya yaptigi interaktifligi, action i aninda diger ine ulastirip aralarinda real-time bir connection ile interaktif islemler yapmasin i sagliyor...ISTE BU MATNIK COK KRITIK ONEME SAHIPTIR...VE SOCKET IO ILE BU ISLEMLERI HANDLE EDEBILIYORUZ
*/