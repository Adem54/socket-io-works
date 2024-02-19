import { useEffect, useState } from "react";
// import { io } from "socket.io-client"; //Bu da ayni isi yapiyor
import socketIOClient from "socket.io-client";
import {
  Line,
  LineChart,
  Tooltip,
  CartesianGrid,
  XAxis
} from "recharts";
//socketio
const socket = socketIOClient("http://localhost:5002");

function App() {

const [data, setData] = useState([]);

useEffect(()=>{

socket.on("message", (data)=>{
  console.log("data-clienttt: ", data);
  setData(data);

})
},[])

console.log("check-dataaa: ",data);
  return (
    <div >
      <h2>React!</h2> 
      {/* <h3>{JSON.stringify(data)}</h3>  */}
        <LineChart  width={1000} height={400} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
}

export default App;
//We will use  Recharts library...in order to show realtime charts in react
//All the charts and real life bars, graphs...
//reacltime- Bitcoin change-stock-markedchange- valutachange-Biz burda surekli realtime olarak, update alacak bir grafik yapacagiz....surekli re-render olacak bu da su demektir, demekki serverda her ornegin 2 saniye de bir bir data guncellenip bu data socket-server a emit ediliyor socket-server da dinledigi bu data yi, client a emit ederek her ornegin 2 saniye de bir clieant a guncel data olarak sunuyor, ve client da da kullanicilar anlik olarak guncellenen data yi gorebiliyor