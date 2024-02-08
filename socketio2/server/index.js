
const express = require("express");
const app = express();
//websocket ilk olarak httpserver ile olusturuldugundan dolayi biz bu sekilde httpserver olusturarak baslariz
const http = require("http");
const  { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const httpServer = http.createServer(app);//Bu normalde inbuilt geliyor ama inbuilt gelmedigi durumlarda ayrica httpServer npm package uzerinden onu da indirebiliriz.const httpServer = createServer();

const io = new Server(httpServer , {
    cors: {
        origin:"*",//Tum istekleri kabul et
        //origin:"http://localhost:3000" spesifik bir client tan gelecek bir istek icin...
        methods:["GET", "POST"],
    }
})

//Server tarafinda clienttan gonderilen emmit leri almak icin burda dinlememiz gerekiyor dinlemek icin .on kullaniriz 
//Socket server kendisine baglanan, abone olan, her bir user a client a farkli bir id atamasi yapiyor
io.on("connection", (socket)=>{
    console.log(`User connected  ${socket.id}`);

//bur id veya roomnumber verilir, ve socket-server bunu dinliyor ve hangi oda numarasijna kim dahil olmus onu dinlioyr burda, front-end den spesifk room-number gonderilecek onu bekliyor....
    socket.on("join_room", (data)=>{
        socket.join(data);
    })


    //!send_message i dinleme-listening ve -receive_message i bir oda icinde yapabukne islemi

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data);
        //socket.to ile mesajin spesifik olarak nerye, hanig gruba gonderilecegini belirtmek icin kullaniliyor, ve de spesifk odaya alinan mesaj, sonrasinda da emit ile o oda daki tum kullaniclara receive_message eventi uzerinden emmit edilmis oluyor
    })

    //Dikkat edelim connection icerisinde alabiliyoruz biz, client taraindan emit edilen yani gonderilen, mesaji..
    //Ama socket-server tamam aldi bu mesaji client in birinden veya farkli farkli browser lardan socket-io ya baglanan clientlardan ama herhangi birinden aldigi, mesaji nasil ayni anda, socket-io ya abone olmus, baglanmis tum clientlara iletecek, yani emit edecek....
    socket.on("send_message", (data)=>{
        console.log(`message is listening:  ${data.message}`)
        //broadcast(yayin, duyurmak, nesretmek)
        //broadcast ile  herkese birseyler gonermemize izin veriyor, yayin yapmak gibi, kendimz haricindeki herkese birseyler gonderebiliyhoruz 
        //bu sekilde biz bizim disimizdaki tum clientlarin bize gonderidgi mesajlarin diger her bir client in yazilan herseyi almalari icin kullanacaklari event - receive_message , ama dikkat edelim, burda diger clientlar tarafindan gonderilen tum mesajlar
        //Simdi front-end e gidip socket-server in mesaji aldiktan sonra, mesaji broadcast.emit ile tum clientlara duyurdugu event i fornt-end de kullanarak ayni anda, real-time sekilde yazilan tum mesajlar tum clientlara aninda ve a yni anda ulascaktir
        socket.broadcast.emit("receive_message", data)
        //Clientlar bu methodu-event i kullanarak anlik olarak herhangi bir clienttan  yazilan mesajlari gorebileceklerdir
    })

   
})
  //Her bir sayfa refresh edildiginde yeni den baglanti kuruluyor socket-io ile ve socket-server refresh yapilan client a y eni bir uniq id atamasi yapiyor...Ayrica da her bir farkli client icinde uniq-id atamasi yapiyor
  //Yani socket-server kendisine kac kez baglanti yapildigi yani bu baglanti dedgimz client tarafinda   const socket = io.connect(serverURL); her syafa yenilendiginde bu io.connect(serverURL) yazildigindan hemen algiliyor....


//http://localhost:3002/test bu sekilde normal httpserver imizn calisip calismadigini gorebiliriz
app.get("/test", (req,res)=>{
    return res.json({result:true, message:"successfull", data:[{id:1, name:"Adem"}]})
})


httpServer.listen(3002, ()=>{
    console.log("Server is running!!")
});


//AYRICA SERVER TARAFINDA YANI BURDA YAPILAN DEGISIKLIGIN OTOMATIK ALGILANMASI ICIN PACKAGE.JSON ICERISINE GIDERIZ VE main altina
/*
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"nodemon index.js"
  },

  ekledikten sonra artik npm start yaparak server imizi tekrar calistiridiktan sonra bizim server da yaptigmiz her degisiklk icin server i kill edip tekrar node index.js dememiz e gerek  yok
*/




/*

!Long-polling nedir?
Client bir http request yapıp gerekli bir bilgiyi server'dan almak için istekte bulunması gerekir.
 Bilginin güncellenmesi durumunda client tarafına bir feedback/response alınması için client ın 
 sürekli request yapmasının yerine, http long polling tekniği ile ilk http 
 request yapıldıktan sonra eğer var olan bilgi güncellenmemi yani yeni bir bilgi değil 
 ise client'a response dönmez. Ancak bilgi değişene, yenilene veya silinene kadar bekler bilgi de herhangi bir degisme, silinme vs oldugunda işte o zaman server,  client tarafa response döner. Client dan ise ozaman yeni
   bir request yine gönderilir, ve server tarafında yine bilginin güncellenme,
    yenilenme,silinme gibi değişiklik durumu olduğu zaman client tarafına bildirim için response dönecektir.
örneğin; facebook beğeni bildirimi alma , gelen bir emailin bildirimi vs.


!HTTP Server and TCP
TCP (Transmission Control Protocol): TCP is a fundamental protocol in the suite of Internet protocols. It enables reliable, ordered, and error-checked delivery of a stream of bytes between applications running on hosts communicating over an IP network. Most internet protocols, including HTTP, rely on TCP for data transmission.

!HTTP Server: An HTTP server is a software that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages). It can be accessed by web clients through network requests, usually over TCP/IP. HTTP servers respond to client requests by serving files like HTML, CSS, JavaScript, and images.

Socket.IO and Its Operation
Integration with HTTP Server: Socket.IO is built on top of the WebSocket protocol and uses HTTP as the initial transport mechanism to establish a connection between the client and server. WebSocket is a separate protocol from HTTP, but it's designed to work over the same ports as HTTP (80) and HTTPS (443) and to be compatible with HTTP servers and intermediaries, making it easy to set up and use in existing web infrastructures.

Upgrading from HTTP to WebSocket: Socket.IO initially establishes a connection with the server using a standard HTTP request. This is known as the "handshake." After the handshake, if the client and server both support WebSocket, Socket.IO can upgrade the connection to use WebSocket. WebSocket provides a full-duplex communication channel over a single TCP connection, allowing for more interactive and real-time communication.

Fallback Mechanisms: One of the advantages of Socket.IO is its ability to fall back to HTTP long-polling if WebSocket is not supported by the client or if WebSocket connections are blocked by intermediaries like firewalls or proxies. Long-polling is a technique where the client makes an HTTP request to the server, and the server holds the request open until new data is available to send back to the client, simulating a real-time connection.

Summary
While Socket.IO can work over an HTTP server, it's not limited to just HTTP's request-response model. By leveraging WebSocket for real-time, bidirectional communication and falling back to HTTP long-polling when necessary, Socket.IO provides a robust solution for real-time web applications. The underlying transport mechanism for both HTTP and WebSocket (when used by Socket.IO) is TCP, ensuring reliable data transmission across the network.

*/