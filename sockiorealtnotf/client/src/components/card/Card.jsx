import React, { useEffect, useState } from 'react'
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";

const Card = ({ post , socket, user}) => {

    const [liked, setLiked ] = useState(false);

    console.log("post: ", post);
    //type ise heart-type:1
   const handleLike =  (type)=>{
    // setLiked(curr=>!curr);
    setLiked(true);
    console.log("liked: ", liked);
    socket.emit("send_notification", {
        senderName:user,
        receiverName:post.username,//hangi user a tiklandi ise, yani post lari olan user lardan hangisine tiklandi ise onu gonderecegiz...ve senderName de , bu sayfayi acip username ini girip de post lardan istedgine like koyan kisi kim ise o..
        type
    })
  
   } 

   //!DUSUNULEN SENARYOU ASAGIDAKI GIBI!!!!
   //!Burda planlanan senaryou su, biz posts l istesinde 2 farkli kullanicinin postunu, listelioyruz, iste 1-John 2.Monica ve uygulamaya da girildiginde ki input alaninda user olarak da bu userlar giris yapacagini varsayiyoruz ve username olrak John girilecek ve John MOnica nin postuna like koyacak, sonra da baska bir browser da Monica giris yapip John un postuna heart-kalp-like koyacak....Senaryou tam olarak bu

useEffect(()=>{

   
}, [])
//!Burasi reactta socket-server i dinlerken, en onemli noktalardan bir tanesidir, useEffect te dependencies array icine socket i vererek, biz socket-server dan herhangi bir data gelir gelmez bunu almis oluyoruz aslinda...Bu coook onemli...Bunu da bilmek gerekiyor

  return (
    <div className='card'>
        <div className='info'>
            <img src={post.userImg}  alt="" className='userImg'/>
            <span>{post.fullname}</span>
        </div>
        <img src={post.postImg}  alt="" className='postImg'/>
    <div className='interaction'>
        
       { liked ?   <FaHeart onClick={()=>handleLike(1)} className='cardIcon heartIcon'/> :   <FaRegHeart onClick={handleLike} className='cardIcon' /> }
      
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