import React, { useState, useEffect } from 'react'
import { Avatar } from "@material-ui/core"
import "./Sidebarchat.css"
import db from "../../../Firebase/Firebase"
import { Link } from "react-router-dom"

function Sidebarchat({room, user}) { 
 
  
    const [messages, setMessages] = useState("")
    const [contactid, setContactid] = useState(null);
    const [userindex, setUserindex] = useState("");
    const [allmembers, setAllmembers] = useState(null);
    const [dp, setDp] = useState("");
    const [name, setName] = useState("");


   
    
     
    useEffect(() => {
           
            const unsubscribe =  db.collection("chats")
            .doc(room.id) 
            .collection("messages")
            .orderBy("time", "desc")
            .onSnapshot((snapshot) => 
              setMessages(snapshot.docs.map((doc) =>
               doc.data()))
            );

          // console.log(room.data.members)
           setAllmembers(room.data.members)
           var indx = room.data.members.indexOf(user.uid).toString()
           //console.log(indx)
          if(indx == "0")
          {
            //console.log(room.data.members[1])
             setContactid(room.data.members[1])
          }
          if(indx == "1")
          {
           // console.log(room.data.members[0])
             setContactid(room.data.members[0])
          }
            

      



        return () => {
            unsubscribe();
        }
     
     }, [room.id])


     useEffect(() => {
        
     
     }, [userindex])




    useEffect(() => {
        
        if(contactid != null)
        {
            //console.log(contactid)

            db.collection("users").doc(contactid).onSnapshot((snapshot) => (
                setName(snapshot.data().name),
                setDp(snapshot.data().profile_photo)
            ))
        }
    }, [contactid])
    
    
     
    return  (
        <Link to={`${contactid}`} style={{ textDecoration: "none" }}>
        <div>
            <div className="main__sidechat">
           <Avatar src={dp}/>
           <div className="sidechatinfo">
               <h4>{name}</h4>
             <p>{messages[0]?.text}</p>
           </div>
 
           </div>       
        </div>
        </Link>  
    )
}

export default Sidebarchat
 