import React from 'react'
import "./Intro.css"
import background from "../../Images/whatsapp.jpeg"



function Intro() {
    return (
        <div className="intro_main">
            
           <div style={{marginTop:"50px"}}>
               <img src={background} alt="background"/>
           </div>
           <h2 className="intro_tag">Welcome to whatsapp</h2>
          
        </div>
    ) 
}

export default Intro
