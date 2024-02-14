import React, { useState } from 'react'
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";

const Card = ({post}) => {

    const [liked, setLiked ] = useState(false);

    console.log("post: ", post);

   const handleLike = ()=>{
    setLiked(curr=>!curr);
   } 
  return (
    <div className='card'>
        <div className='info'>
            <img src={post.userImg}  alt="" className='userImg'/>
            <span>{post.fullname}</span>
        </div>
        <img src={post.postImg}  alt="" className='postImg'/>
    <div className='interaction'>
        
       { liked ?   <FaHeart onClick={handleLike} className='cardIcon heartIcon'/> :   <FaRegHeart onClick={handleLike} className='cardIcon' /> }
      
        <FaRegComment className='cardIcon' />
        <FaRegShareFromSquare className='cardIcon' />
        <FiInfo className='cardIcon infoIcon' />
    </div>
    </div>
  )
}

export default Card
/*
Mantik su olacak, kullanicilardan 1 tanesi diger kullanicinin postunu heart-kalbe bazip begendiginde, bu begenin postu begenilen kullaniciinin notification iconu uzerinde 1 diye veya 2 farkli kullanici tarafindan begenilmis ise  2 diye gelecek, ama otomatik olarak gelecek, postu begenilen kullanici sayfay yenileme vs yapmadan gelecek, ve de notification larda da , kim begendi ise o kisinin begendi mesaji olacak... 
!Aslinda, socket-io nun yaptgii client-lar arasi interaktif ligi, otomatik hale getirmesi idi iste bu da, iki client arasinda veya birden fazla client arasinda anlik olarak, dikkat edelim burasi cok onemli, real-time, yani bir kullanici diger kullaniciya yaptigi interaktifligi, action i aninda diger ine ulastirip aralarinda real-time bir connection ile interaktif islemler yapmasin i sagliyor...ISTE BU MATNIK COK KRITIK ONEME SAHIPTIR...VE SOCKET IO ILE BU ISLEMLERI HANDLE EDEBILIYORUZ
*/