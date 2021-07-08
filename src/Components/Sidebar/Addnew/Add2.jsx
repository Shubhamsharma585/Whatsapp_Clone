import React, {useState, useEffect} from 'react'
import db from "../../../Firebase/Firebase"
import "./Add.css"
 

function Add2({user}) {


    const [userDetails, setUserDetails] = useState("")
 
    const createchat = ()  => {
       
        const contact = prompt("type phone number")
       if(contact)
         {
             //console.log(user.uid, contact)
             db.collection('mobiles').doc(contact).get()
                .then(async snapshot => 
                    (setUserDetails(snapshot.data())
                    // console.log(snapshot.data())
                    )           
                 )    
        } 
    };


    useEffect(() => {
       
        if(userDetails)
        {
            //console.log(userDetails)
            db.collection("chats").add({
               members: [`${user.uid}`, `${userDetails.uid}`]
            })
            setUserDetails("")
        }
    }, [userDetails])




    return (
        <div>
            <div className="main__addnew" onClick={() => createchat()}> 
             <h3>Create New Chat</h3>
           </div>
        </div>
    )
}

export default Add2;
