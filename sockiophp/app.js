const http = require("http");
const httpServer = http.createServer();

const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin:"*",
        methods:["GET", "POST"]
    }
})

//!Dikkat edelim, hersey ilk socket baglantinsi io.on uzerinden connection event i icinde oluyor ki baglanti var iken gerceklesssin, baglanti kopmasi da yine nerde olacak, baglanti icinde olacak, cunku baglanti kopmasi demek baglanti var iken olmasi demektir..ama suna dikkat ilk baglanti da io.on("connection", ) kullanilirken, disconnection icin ise connection dinlenirken ki callback icinde socket.on("disconnect", ) seklinde oluyor bu farkli iyi bilelimn

io.on("connection", (socket)=>{
    console.log(`User conenected to ${socket.id}`);
//!php(backend) den socket-server a , socket-server dan da client-frontend e, client sadece dinleyecek...gelen mesaji alacak
    socket.on("send-message", data=>{
        console.log(`send-message-data: ${JSON.stringify(data)}`);
        io.emit("messages", data);//clienttan gelen mesaj data sini da al diger tum bu socket i dinleyen clientlara godner demis oluyoruz...
    })

    socket.on("disconnect", ()=>{
        console.log(`A user left from the socket-connection`);
    })

})
//!Sunu iyi bilelim,,sayfa yenilendiginde socket baglantsini kopuyor ve sayfa gelince tekrar socket baglantisi olusuyor

httpServer.listen("5000");
//!En hizli vekolay sekiklde nasil bu sokcet-server in calisp calismadini test ederiz
//http://127.0.0.1:3006  veta http://localhost:3006

/*
const server = require("http").createServer();
const io = require("socket.io")(server);//Direk parametreye server i gecerek new Server in yaptigi isin aslinda aynisini yapmis oluyor...BU FARKLILIGA DIKKAT EDELIM...ONEMLI BIR FARKLILIK AMA 2 SEKILDE DE KULLANILABILIYOR DEMEKKI

io.on("connection", function(socket){
    console.log(`User conenected to ${socket.id}`);
})

npm install socket.io
npm install pm2 -g (node.js in process manageridir, arka plan da surekli olarak node un calismaya devam etmesi icin bunu yapiyoruz)
node app.js diye degil de pm2 start app.js dersek surekli arka plan da acik kalacaktir, log mesajlarini gorebiliyoruz

[PM2] Starting /home/adem/socketio/sockiophp/app.js in fork_mode (1 instance)
[PM2] Done.
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ app    │ default     │ 1.0.0   │ fork    │ 1628520  │ 0s     │ 0    │ online    │ 0%       │ 32.4mb   │ adem     │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ 
[PM2] Starting /home/adem/socketio/sockiophp/app.js in fork_mode (1 instance)
[PM2] Done.
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ app    │ default     │ 1.0.0   │ fork    │ 1628520  │ 0s     │ 0    │ online    │ 0%       │ 32.4mb   │ adem     │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$

Biz ctrl-c diyene kadar calismaya devam edecektir...normalde herhangi bir hata oldugudna server down olur, yani durur ama pm2 sayesinde surekli calisiyor daha dogrusu durdurmak icin ise pm2 stop app.js

[PM2] Starting /home/adem/socketio/sockiophp/app.js in fork_mode (1 instance)
[PM2] Done.
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ app    │ default     │ 1.0.0   │ fork    │ 1628520  │ 0s     │ 0    │ online    │ 0%       │ 32.4mb   │ adem     │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ 

Asagidaki gibi de log mesajlarini okuyabiliriz

adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ pm2 logs
[TAILING] Tailing last 15 lines for [all] processes (change the value with --lines option)
/home/adem/.pm2/pm2.log last 15 lines:
PM2        | 2024-02-18T12:25:43: PM2 log: RPC socket file      : /home/adem/.pm2/rpc.sock
PM2        | 2024-02-18T12:25:43: PM2 log: BUS socket file      : /home/adem/.pm2/pub.sock


adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ pm2 stop app.js
[PM2] Applying action stopProcessId on app [app.js](ids: [ 0 ])
[PM2] [app](0) ✓
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ app    │ default     │ 1.0.0   │ fork    │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ adem     │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ pm2 start app.js
[PM2] Applying action restartProcessId on app [app](ids: [ 0 ])
[PM2] [app](0) ✓
[PM2] Process successfully started
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ app    │ default     │ 1.0.0   │ fork    │ 1634103  │ 0s     │ 0    │ online    │ 0%       │ 19.9mb   │ adem     │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
adem@adem-ThinkPad-13-2nd-Gen:~/socketio/sockiophp$ pm2 logs
[TAILING] Tailing last 15 lines for [all] processes (change the value with --lines option)
/home/adem/.pm2/pm2.log last 15 lines:
PM2        | 2024-02-18T12:25:43: PM2 log: Concurrent actions   : 2
PM2        | 2024-02-18T12:25:43: PM2 log: SIGTERM timeout      : 1600
PM2        | 2024-02-18T12:25:43: PM2 log: ===============================================================================
PM2        | 2024-02-18T12:25:43: PM2 log: App [app:0] starting in -fork mode-
PM2        | 2024-02-18T12:25:43: PM2 log: App [app:0] online
PM2        | 2024-02-18T12:28:18: PM2 log: Stopping app:app id:0
PM2        | 2024-02-18T12:28:19: PM2 log: App [app:0] exited with code [0] via signal [SIGINT]
PM2        | 2024-02-18T12:28:19: PM2 log: pid=1628520 msg=process killed
PM2        | 2024-02-18T12:28:54: PM2 log: App [app:0] starting in -fork mode-
PM2        | 2024-02-18T12:28:54: PM2 log: App [app:0] online
PM2        | 2024-02-18T14:41:06: PM2 log: Stopping app:app id:0
PM2        | 2024-02-18T14:41:06: PM2 log: App [app:0] exited with code [0] via signal [SIGINT]
PM2        | 2024-02-18T14:41:07: PM2 log: pid=1629020 msg=process killed
PM2        | 2024-02-18T14:41:13: PM2 log: App [app:0] starting in -fork mode-
PM2        | 2024-02-18T14:41:13: PM2 log: App [app:0] online

/home/adem/.pm2/logs/app-error.log last 15 lines:
/home/adem/.pm2/logs/app-out.log last 15 lines:
0|app      | User conenected to 6fSER3Kp2UM3OC8RAAAB

!Server da yani pm2 ile sokcet-server i calistirdigmiz zaman, connection vs gibi yazdigmz console.log mesajlarini biz, pm2 logs diyerek gorebiliriz...Yani sockt-server imiz surekli olarak calisiyor ve biz console.log mesajairmizi gormek icin pm2 logs yazariz...Ayrica herhangi bir degisiklik yaptigmz zaman, socket-server da pm2 stop app.js ve pm2 start app.js yaparak, server daki degisikligin algilanmasini saglariz bunu da unutmayalim...

Yeniden baslatmak icin ise 
!pm2 restart 0 (0 socket-server imizin id si)
!pm2 logs ile de log(console.log  meslairni okuyabiliriz)
!pm2 start 0 - pm2 stop 0

!HARIKA BIR ACKLAMA IO.EMIT - SOCKET.EMIT - SOCKET.TO - IO.TO--NEDEN BU SEKILDE BIR FARKLILIK VAR....

In Socket.IO, both io.emit and socket.emit are used to send messages, but they target different sets of connections, which is the primary reason for their differences in usage:

socket.emit: This sends a message to the socket (client) that initiated the current event. It's a way to communicate back to the originator of the current event. For example, if a client sends a message to the server and you want to reply specifically to that client, you would use socket.emit.

io.emit: This sends a message to all connected clients. If you want to broadcast a message to everyone who is connected to your server, you would use io.emit. This is useful when you want to push updates or notifications to all users, regardless of which room they are in or what event they triggered.

In the context of your examples:

In the first block, socket.to(data.room).emit("receive_message", data); is used to send a message to all clients in a specific room, except for the sender. This is useful in applications like chat rooms, where you want to broadcast a message to all other users in the same room.

The use of socket.broadcast.emit("receive_message", data) broadcasts a message to all connected clients except for the sender. This is another way to send a message to everyone except the originator of the current event.

In the second block, io.emit("messages", data); is used to send the received message data to all connected clients, including the sender. This approach is used when you want every connected client, regardless of their room or event, to receive the same information.

In summary, the choice between socket.emit, socket.to().emit, socket.broadcast.emit, and io.emit depends on the intended recipients of the message you are sending:

Use socket.emit to reply to the sender.
Use socket.to(room).emit to send to a specific room (excluding the sender).
Use socket.broadcast.emit to send to all connected clients except the sender.
Use io.emit to send to all connected clients, including the sender.
Use io.to().emit() bunu da spesifik bir user a gonderirken kullaniriz

*/