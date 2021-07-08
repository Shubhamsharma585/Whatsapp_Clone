import React, { useState, useEffect } from 'react';
import db, { auth, google } from "../../Firebase/Firebase";




export const AuthContext = React.createContext()


function Login({children}) { 
 
 
    const [isloggedin, setIsloggedin] = useState(false);
    const [user, setUser] = useState();
    const [mobile, setMobile] = useState("");


      
  
 
    const handlelogin = () => {

        var mobile = prompt("Please Enter Correct Mobile Number")
        if(mobile)
        {
            auth.signInWithPopup(google)
            .then((resp) => {
                setUser(resp.user)
                // console.log(resp.user)
                setIsloggedin(true)

                db.collection("mobiles").doc(mobile)
                .set({
                    displayName: resp.user.displayName,
                    dp: resp.user.photoURL,
                    uid: resp.user.uid
                })
            })
            .catch((err) => console.log(err));   
        }

      }


      const handlelogout = () => {
          auth.signOut().then(() => {
            setIsloggedin(false)
          }).catch((error) => {
            // An error happened.
          });

      }


      useEffect(() => {
          if(user)
          {
            console.log(user.uid, mobile, user.displayName, user.photoURL) 
            db.collection("users").doc(user.uid).set({
                mobile: mobile,
                name: user.displayName,
                profile_photo: user.photoURL,
            })
          } 
         
      }, [user]) 

   
 
  
    

    const value =
    {
       handlelogin,
       handlelogout,
       isloggedin,
       user
    }

    
    const [s, setS] = useState("ok")
    return (
        <div>
           <AuthContext.Provider value={value}>
               {children}
           </AuthContext.Provider>
            
        </div>
    )
} 

export default Login;
