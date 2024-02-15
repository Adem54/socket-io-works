//!Dikkat edelim burda, sadece socket-server kullaniyoruz express kullanmadan
import { Server } from "socket.io";

const io = new Server( { 
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

//!Bos bir array olusturuz ve her ne zamanki yeni bir kullanici baglanirsa o kullaniciyi bu arrayimizin icine atariz, ve ne zamanki bir kullanici da baglantiyi koparip online olmaktan cikarsa onu da bu array dan sileriz..
let onlineUsers = [];
/*
[
    {
        useid:"dfas",
        socketid:"dfsadfasdf"
    }
]


*/

const addNewUser = (username, socketId) => {
    //!Eger kullanici onlineUsers lar arasinda yok ise ekle..
    !onlineUsers.some(user=>user.username === username) && onlineUsers.push({username, socketId});
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user=>user.socketId !== socketId);
}

const getUser = (username) => onlineUsers.find(user.username ===  username);

io.on("connection", (socket) => {
  // ...
  console.log("Someone has connected to socket.io  id: ", socket.id);

    socket.on("newUser", username=>{
       
        //!Bizim socketid yi client dan gondermemiz e gerek yok cunku zaten socket-server kendisine kimin baglandigini otomatik olarak alabiliyor
        addNewUser(username, socket.id); 
    })

    //Like butonna tiklandignda socketserver a data yi gonderirken, kullanci kendi username ini sonra, kime gonderiyorsa daha dogrusu kimin postuna tiklamis ise onun username ini ve de tikladigi interaction ne ise onu(heart..) gondermesi gerekiyor ki, sokcet-io data yi aldigi gibi hedef clienta aninda haber verebilsin...COOK ONEMLI
    socket.on("send_notification", ({senderName, receiverName, type})=>{
        const receiver = getUser(receiverName);
        //!Spesifik kullaniciya tekrardan gelen, like islemini aninda gonderiyoruz...COOOK ONEMLI
        io.to(receiver.socketId).emit("get_notification", { senderName, type });
    })



  //Bu disconnect, olayi kullanicinin browser i kapatmasi ile tetiklenecektir..
  socket.on("disconnect", ()=>
  {
    console.log("someone has left from the connection of socket-server");
    removeUser(socket.id);
  })

});

io.listen(3005);

//Normlde uygulamamiz import module u desteklemiyor ondan dolayi hata aliriz
//Import modulu desteklemesi icin yapmamiz gereken onemli birsey, package.json da main:index.js altina type:module yazmak