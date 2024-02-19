import express from "express";
//import { Server } from "socket.io";
import * as socketio from "socket.io";
import { createServer } from "http";

const app = express();

const httpServer = createServer(app);

/*
const io = new Server(httpServer, {
    cors:"*",
    methods:["GET", "POST"]
})
*/

const io = new socketio.Server(httpServer, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    },
  
})

let timeChange;

const data = [
    { name: '1', x: Math.random() * 10,  y: Math.random() * 10 },
    {  name: '2', x: Math.random() * 10, y: Math.random() * 10},
    {  name: '3', x: Math.random() * 10, y: Math.random() * 10},
    {  name: '4', x: Math.random() * 10, y: Math.random() * 10},
    {  name: '5', x: Math.random() * 10, y: Math.random() * 10},
  ];
io.on("connection", (socket)=>{
    console.log("A user connected to socket-server id: ", socket.id);
  // Create a unique interval for each connection
  const intervalId = setInterval(() => {
    // Ensure data array does not exceed 6 elements
    if (data.length > 5) {
      data.shift(); // Remove the first element
    }
    // Add a new data point
    data.push({
      name: (parseInt(data[data.length - 1].name) + 1).toString(),
      x: Math.random() * 10,
      y: Math.random() * 10
    });

    console.log("data-socket-server: ", data);

    // Emit the updated data to all connected clients
    io.emit("message", data);
  }, 8000);

  // Clear the interval on socket disconnect
  socket.on("disconnect", () => {
    clearInterval(intervalId);
    console.log("Disconnected: id: ", socket.id);
  });
})

httpServer.listen("5002");

    //timeChange = setInterval(()=> socket.emit("message", new Date()),1000)
//Her 1 saniyede bize yeni data geldgini dusunelim, simule edelim...ondan dolayi da biz bu is icin new Date() i kullandik ki surekli degistigi icin bizim amacimza uygun islem yapmak icin. Ama gercek hayatta her 1 dakika da veya 30 saniye de 1 bize guncel data donenen backend service leri vardir ornegin iste bu tarz servislerden alaagiz biz gercek hayatta data yi backendde ve socket-server a aktaracagiz ordan..ve socket-server dand a tabi ki clienta her 30 saniye, 1 dakika , 2 saniye  , 1 saniye de bir data yi client tarafinda da guncelleyebilmi solacagiz
//Her 1 saniyede birkez mesaj gonderecek    

//!HARIKA BESTPRACTISE...ISTE ANLIK OLARAK DEGISTIRILEN DATALARIN HEPSINDEKI MANTIK BUDUR...YANI SERVER TARAFNDA-BACKENDDE KULLANIALN BIR SERVICE DEN GELEN BELLI ARALIKLARALA GELEN ONLINE BIR DATA ALINIP SOKCET-IO YA AKTARILIYOR VE SOCKET-IO DA BUNU AYNI ARALIKLARLA CLIENTA AKTARARAK ON YUZDE REAL TIME BIR SEKILDE DATA LARIN TAKIP EDILMESI SAGLANMIS OLUYOR....