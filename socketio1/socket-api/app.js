//Server tarafimzi kuruyouruz 

import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer();

const io = new Server(httpServer, {
    //Gonderilen isteklerin taninmasi icin.. cors ayari
    cors: {
        origin:"*"
    }
});

//Socket sunucumuza baglanti oldugunda tetiklenecek fonksiyon calisiyor
//connection-dinlenecek event , 2.paremtre de o event tetiklendigi zaman calisacak fonksiyonu aliyor
io.on("connection", (socket)=>{

    console.log("Bir kullanici socket sunucusuna baglandi")
    console.log("Socket.ID: ", socket.id)

    //Eger bir client cikis  yaparsa, baglantisini koparirsa tetiklenecek eventtir
    socket.on("disconnect", ()=>{
        console.log("Kullanici-client socket baglantisini terketti!!")
    })

})

//Sunuucuyu calistirmam icin httpServer ile dinlememiz gerekiyor 

httpServer.listen(3001);

//Sockette 2 tane onemli konu var baslica
//1.emit:Bir olayi tetiklemek istedgimz zaman kullanilir ..YANI ORNEGIN BIR CLIENT TARFINDA TETIKLENEN OLAY O SOCKET E ABONE OLMUS TUM CLIENTLAR A ANINDA ULASSIN ISTERSEK BU CLIENT EMIT ILE TETIKLENIR...DIGER CLIENT LAR ISE ON ILE TETIKLENEN DEGERI DINLERLER ANINDA
//Server tarafinda emit edilen data, client lar tarafindan on edilerek dinlenilir anlkik olarak
//emit : Dinledigmiz olayi tetiklemek istedgimzde kullanilir
//2.on tetiklenen olayi dinlemek istedigmz zaman kullanilir

/*

adem@adem-ThinkPad-13-2nd-Gen:~/socketio/socketio1/socket-api$ node app.js
(node:1001778) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/adem/socketio/socketio1/socket-api/app.js:3
import { createServer } from "http";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1126:15)
    at Module._compile (node:internal/modules/cjs/loader:1162:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1252:10)
    at Module.load (node:internal/modules/cjs/loader:1076:32)
    at Function.Module._load (node:internal/modules/cjs/loader:911:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:22:47

    ALDIGIM HATA VE COZUMU!!!! IMPORT KULLANABILMEM ICIN PACKAGE.JSON DA "type":"module" vermemiz gerekiyor

    {
  "name": "socket-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type":"module",


 AYRICA CLIENT-TARAFINDA BIZ REACT UYGULAMASINI AYAGA KALDIRDIGMZ ZAMAN, SOCKET SERVER A BAGLANMA ISTEGI GONDERECEK VE SERVER TARAFIMZDA ASAGIDAKI GIBI CONSOLE U GORUUYOR OLACAGIZ!!! 
 SOCKET-SERVER IMIZ IN CALISIYOR OLMASI GEREKIYOR BUNU UNUTMAYALIM.....     
 !Kullanici-client socket baglantisini terketti!!--cLIENT TARAFINDA SAYFA YENILENDIGI ZAMAN, SAYFA UNMOUNT OLDUGU ICIN, COMPOENTTEN CIKIYOR ILK ONCE VE BAGLANTIYI TERKETMIS OLUYOR ARDINDAN SAYFA YENILENINCE BAGLANTI TEKRAR KURULMUS OLUYOR!!!   

 Bir kullanici socket sunucusuna baglandi
Socket.ID:  XUMZQaHN6wp7hizcAAAT
Bir kullanici socket sunucusuna baglandi
Socket.ID:  05JCnjfevh5rXwWhAAAV
Bir kullanici socket sunucusuna baglandi
Socket.ID:  DCLvvAtLA07p4lM5AAAX
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Kullanici-client socket baglantisini terketti!!
Bir kullanici socket sunucusuna baglandi
Socket.ID:  Z6xJztDjWZYa8NZcAAAa
Bir kullanici socket sunucusuna baglandi
Socket.ID:  2oNVeDN50fHHjDsGAAAb
Bir kullanici socket sunucusuna baglandi
Socket.ID:  _vLD8GEeT0XoWuAoAAAe
Bir kullanici socket sunucusuna baglandi
Socket.ID:  lH9WyUN_cbnMVb_6AAAf
 
*/