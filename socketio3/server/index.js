const express = require("express");
const app = express();

const http = require("http");//socket-io ile serverimzi olusturmak icin gereklidir bu
const httpServer = http.createServer(app);

//Bu ozellikle socket-io da problem almamak icin cok onemlidir...ve uygulanmalidir
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());


const io = new Server(httpServer , {
    cors: {
        origin:"*",
        methods:["GET","POST"],
      
    }
})

//io connection i, ne zaman ki client-side dan bir kullanici socket-io ya baglanir, yani ne zamanki bir istek gonderiri  o zaman iste bu socket-server daki bu baghlanti gerceklesecektir
//io.on("connection") demek, connection event ini dinliyor...beklioyr
//Burdaki 2.parametredeki socket uzerinrden her bir kullanici icin, 1 uniq id verilir...
io.on("connection", (socket)=>{
    console.log(`user connected: ${socket.id}`);
})


httpServer.listen(3003,()=>{
    console.log("HttpServer is running")
})

/*
!Socket-io da ya bir event olusturup data ile beraber o event i de emit edersin ki , bu client lar tafaindan socket.on() ile dinlenebilsin....1.parametre emit edilirken hangi mehtod ismi verildi ise o dur, 2.parametre emit ile olusturulan event ve gonderilen data ne ise 2. parametre de gonderilen data...dir...
*/