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
io.on("connection", (socket)=>{
    console.log("A user connected to socket-server id: ", socket.id);
    if(timeChange) clearInterval(timeChange)
    timeChange = setInterval(()=> socket.emit("message", new Date()),1000)
//Her 1 saniyede birkez mesaj gonderecek
    

    socket.on("disconnect", ()=>{
        console.log("Disconnected:  id: ",socket.id );
    })
})

httpServer.listen("5002");