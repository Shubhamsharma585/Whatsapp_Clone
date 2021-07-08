import React from 'react'
import Sidebar from "../Sidebar/Sidebar"
import Chats1 from "../Chats/Chats1"
import { Route, Switch } from "react-router-dom"
import Intro from "../Intro/Intro"
import "./Home.css" 
 
 

function Home({user, handlelogout}) {
    return (
        <div className="main__home">
           <Sidebar user={user} handlelogout={handlelogout}/>

           <Switch>

           <Route path="/" exact>       
               <Intro/> 
            </Route>   

           <Route path="/:roomid" exact>       
               <Chats1 user={user} />  
            </Route> 

           </Switch>

            
        </div>
    ) 
}

export default Home
