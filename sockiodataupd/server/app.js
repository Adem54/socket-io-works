
import { EventEmitter } from 'events';
import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);//express kullanirsak eger bunu createServer parametresine veririz, yok express kullanmaz da normal httpServer ile olsuturursak web-server imizi o zaman da paremtreyi bos birakarak createServer() seklinde cagirarak yeni bir httpServer olustururuz

const io = new Server(httpServer, {
    cors:"*",
    methods:["GET", "POST"]
});

let likes = 0;
const eventEmitter = new EventEmitter();

//!Dikkat edelim EventEmitter tamamen server-side da uretilen bir event, yani backendde uretiliyor ve backendden socket-io ya gonderiliyor ve ordan clienta gonderiliyor...HARIKA BESTPRACTISE...BU TARZ KULLANIMLAR PROJELERIMIZDE COOK IHTIYAC OLAN KULLANIMLARDIR...
//Burda normal bir web-server icerisindeki bir islem ile socket-io  birlikte calisiyor ve socket-server dan, client a data gonderiliyor....BURAYA DIKKAT ..
//!Yani neyi simule ettik, server-backend den belirli araliklar la gonderilen bir data yi biz web-server dan socket-server a emit ediyoruz kendimz event olusturarak, sonra da bunu socket-server dan listen-dinleyerek aliyoruz, ve de socket-server dan da socket-server a baglanan tum kullanicilar a bu data update islemnii ulastirabiliyoruz...
setInterval(()=>{
    likes++;
    eventEmitter.emit("newdata");
}, 2000)
//Kendimz yeni event olusturabiliuoruz, emit edebiiyoruz...ve dikkat edelim burda socket io disinda yaptimgz bu eventi emit ediyoruz ve yine bunu socket-io connection icinde dinleyebiliyoruz


io.on("connection", (socket)=>{
    console.log("a user connected to the socket-server id:", socket.id);

    socket.on("liked", ()=>{
        console.log("liked-listening from socket-server....")
        likes++;//socket-server tarafinda arttirkam istedik bu datayi..yoksa client tarafinda da yapabilirdk bu isi
       
        socket.emit("likeupdate", likes);//updating current user, the liked to live.....
      //  socket.broadcast.emit("likeupdate", likes);//Diger tum socket-io ya baglanan kullanicilarda da update edilmesi icin kullaniyoruz....
    })

    eventEmitter.on("newdata", ()=>{
        socket.broadcast.emit("likeupdate", likes);
    })


    socket.on("disconnect",()=>{
        console.log("User disconnecteddd: ", socket.id);
    })
})


app.get("/", (req,res)=>{
    res.send("HELLO");
})

//io.listen(5001);
httpServer.listen(5001);

/*
! socket.emit("likeupdate", likes);//updating current user, the liked to live.....Dikkkat edelim...mevcut o anda interaction i socket-server a gonderen user a yani live olan user a geri gndermek icin sokcet.emit yapiyoruz...Diger tum kullaniclara gondermek istersek socket.broadcast.emit dersek, kendisi haric  yani interacktifilligi sokcet-server a gonderen client haric diger socket-server a connection olmus tum kullanicilara data yi socket-server dan gondermek icin kullanilir...
!socket.broadcast.emit("likeupdate", likes);//Diger tum socket-io ya baglanan kullanicilarda da update edilmesi icin kullaniyoruz....

*/