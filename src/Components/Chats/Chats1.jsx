import React, { useState, useEffect, useRef } from 'react'
import "./Chats.css"
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from "../../Firebase/Firebase";
import firebase from "firebase";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Upload from "./Upload";



 
function Chats1({user}) {  


    const { roomid } = useParams();
    const [ inp, setInp ] = useState("");
    const [ roomname, setRoomname ] = useState("");
    const [ contact_userId, setContact_userId ] = useState("");
    const [ profile_photo, setProfile_photo ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const [userChatsid, setUserChatsid] = useState([]);
    const [userChats, setUserChats] = useState(null);
    const [chatid, setChatid] = useState("");
    const [img, setImg] = useState("")
    const [showemoji, setShowemoji] = useState(false);



    const dummy = useRef(null)
 


    const emoji = () => {
       setShowemoji(true)
    }

    const emojiclose = (e) => {
      setInp(e)
      setShowemoji(false)
   }
  
    
    useEffect(() => {
      if(roomid)
      {  
        db.collection("users").doc(roomid).onSnapshot((snapshot) => (
            setRoomname(snapshot.data().name),
            setProfile_photo(snapshot.data().profile_photo)
        ))
 
        

        db.collection("chats").where("members", 'array-contains', `${user.uid}`)
        .onSnapshot((snapshot) => 
         (
         setUserChatsid(snapshot.docs.map((doc) => doc.id)),
         setUserChats(snapshot.docs.map((doc) => doc.data()))
         )

       );
       
      }

    }, [roomid, user.uid])




    useEffect(() => {

      if(userChats != null) 
      {
          for(var i=0; i<userChats.length; i++)
          {
             if(userChats[i].members.includes(roomid))
             {
               setChatid(userChatsid[i])
               //console.log(userChatsid[i])

               db.collection("chats").doc(userChatsid[i])
                 .collection("messages")
                 .orderBy("time","asc")
                 .onSnapshot((snapshot) => 
                 setMessages(snapshot.docs.map((doc) => doc.data())))
             }
          }
      }
      
     
    }, [userChats])


    useEffect(() => {

      dummy.current.focus();
      dummy.current.scrollIntoView({block: "end", behavior: "smooth"});

    }, [dummy, messages])


    

     const sendmessage = (e) => {
         e.preventDefault();  

        db.collection("chats").doc(chatid)
        .set({
            members: [user.uid, roomid]
        })

        db.collection("chats") .doc(chatid)
        .collection("messages").add({
         image_url: img,
         profile_photo: profile_photo,
         sender_id: user.uid,
         sender_name: user.displayName,
         text: inp,
         time: firebase.firestore.FieldValue.
         serverTimestamp()
        })

        setInp("")

     }


     useEffect(() => {
       if(img)
       {
        db.collection("chats").doc(chatid)
        .set({
            members: [user.uid, roomid]
        })

        db.collection("chats") .doc(chatid)
        .collection("messages").add({
         image_url: img,
         profile_photo: profile_photo,
         sender_id: user.uid,
         sender_name: user.displayName,
         text: inp,
         time: firebase.firestore.FieldValue.
         serverTimestamp()
        })
       }

       setImg("")
  
     },[img])
 
    return (
        <div className="main__chat">
           <div className="chats_header">
                <Avatar src={profile_photo}/>
                <div className="chats_headerinfo">
                    <h3>{roomname}</h3>

                  {(messages.length != 0)? (<p>Last Seen {
                      new Date(messages[messages.length - 1]?.time?.toDate())
                       .toUTCString()
                     }
                    </p>):("")}
                    
                </div>

               <div className="chats_headerright">            
                <IconButton>
                  <SearchOutlinedIcon/>
                </IconButton>

                   <Upload setImg={setImg}/>

                 <IconButton> 
                   <MoreVertIcon/>  
                </IconButton> 
                </div>
               
            </div>

            <div className="chats_body">
          
              {messages && messages.map((message) => (
                message.time && <p className={`chat_message ${(message.sender_id === user.uid) && `chat_receiver`}`}>
                  <span className="chat_name1">
                    {/* {message.sender_name} */}
                  </span>
                    
                    {message.image_url && <img src={message.image_url} width="250px" />}
                     
                   <p style={{textAlign:"left"}}>
                     {message.text}
                      <span className="chat_timestamp">
                    {message.time &&
                    new Date(message?.time?.toDate()).toUTCString()
                    }
                  </span>
                   </p>
               </p>
               
               )
              )}
                 <div ref={dummy}></div>  
            </div> 


           <div className="chats_footer">
               <IconButton style={{marginTop:"-10px"}} > 
                <InsertEmoticonIcon onClick={() => emoji()}/>
               {showemoji && <Picker 
              style={{ position: 'absolute', bottom: '0px', right: '200px', marginRight:"-300px" }} 
              title='Pick your emoji…' emoji='point_up'
              onSelect={emoji => 
                  emojiclose(`${inp+" "+emoji.native+" "+" "}`)
              }
              />} 
              </IconButton> 
             
             <form>
               <input type="text" name="" id="send_inp" 
               autoComplete="off" 
               placeholder="Type a message" 
               value={inp} onChange={(e) => setInp(e.target.value)}/>
               <button type="submit" onClick={sendmessage}>Send</button>
             </form>
               
                <IconButton style={{marginTop:"-5px"}}>   
                <MicIcon/>
                </IconButton> 
                
            </div> 
        </div> 
    )
}

export default Chats1;
