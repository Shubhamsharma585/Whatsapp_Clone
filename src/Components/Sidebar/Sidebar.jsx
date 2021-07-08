import React, {useState, useEffect} from 'react'
import "./Sidebar.css"
import { Avatar, IconButton } from "@material-ui/core"
import Add2 from "./Addnew/Add2"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Sidebarchat from "./Sidebarchat/Sidebarchat"
import db from "../../Firebase/Firebase"

  


const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 14,
    },
  }))(Tooltip);




function Sidebar({user, handlelogout}) {    

    const [rooms, setRooms] = useState([]);

    
    useEffect(() => {
        const unsubscribe = db.collection("chats")
        .where("members", 'array-contains', `${user.uid}`)
        .onSnapshot((snapshot) => 
    
        setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
                
            }))
        )); 

        return () => {
            unsubscribe();
        }
    }, [])

    // console.log(rooms)

 
    return (
        <div  className="main__sidebar">
            <div className="sidebar__headertop">
                <div className="sidebar__header__left">
                   <Avatar src={user.photoURL}/>
                </div>
              

               <div className="sidebar__header__right">
               <IconButton>
                 <DonutLargeIcon/>
              </IconButton>
              

              <IconButton>
               <ChatIcon/>
               </IconButton>

               <LightTooltip title="LOG OUT">
               <IconButton>
               <MoreVertIcon color="inherit" onClick={() => handlelogout()}/>
               </IconButton>
               </LightTooltip>

               </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__search_cont">
                    <div>
                      <SearchIcon style={{marginTop:"5px", marginLeft:"-10px"}}/>
                    </div>
                     <input type="text" name="" id="" className="search_inp" placeholder="Search or start new chat"/>
                </div>
            </div> 

            <div className="sidebar__chats">

                <Add2 user={user}/>  
                
                {rooms.map((room) => {
                        return(
                            <Sidebarchat 
                            key={room.id} 
                            room={room} 
                            user={user}
                            />
                        )
                    
                    }) 
                } 
                  
            </div> 
             
        </div>
    )
}

export default Sidebar
