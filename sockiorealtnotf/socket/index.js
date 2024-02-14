//!Dikkat edelim burda, sadece socket-server kullaniyoruz express kullanmadan
import { Server } from "socket.io";

const io = new Server( { 
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
  // ...
  console.log("Someone has connected to socket.io  id: ", socket.id);

  socket.on("disconnect", ()=>{
    console.log("someone has left from the connection of socket-server");
  })
});

io.listen(3005);

//Normlde uygulamamiz import module u desteklemiyor ondan dolayi hata aliriz
//Import modulu desteklemesi icin yapmamiz gereken onemli birsey, package.json da main:index.js altina type:module yazmak