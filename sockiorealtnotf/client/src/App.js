import { useEffect, useState } from "react";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";


const socservURL = "http://localhost:3005";
const socket = io.connect(socservURL);


function App() {
  const [username, setUsername] = useState("");
  const [user, setUser ] = useState("");

  console.log("user: ", user);
  console.log("username: ", username);

  useEffect(()=>{
    
  },[])

  return (
    <div className="container">
      {user ?  
      ( 
        <>
          <Navbar/>
          {
            posts.map((post)=>{
              return <Card key={post.id} post={post} />
            })
          }
          <span className="username">{user}</span>
        </>
      ) 
      : 
      ( <div className="login">
          <input type="text"  onChange={event=>setUsername(event.target.value)}   placeholder="username"/>
          <button onClick={()=>setUser(username)}>Login</button>
        </div>
      )
        
        }
     
    </div>
  );
}

export default App;
