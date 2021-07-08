import { useContext } from "react"
import './App.css';
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login"
import { AuthContext } from "./Components/Login/Login"
import Button from '@material-ui/core/Button';


function App() {


  const {handlelogin, handlelogout, isloggedin, user} = useContext(AuthContext)



  return !isloggedin? ( 
  
     <div className="App">
        <div className="LoginIntro">
            <h1 style={{color:"green", marginBottom:"50px"}}>Please login to use Whatsapp</h1>
 

      <Button variant="contained" color="primary" onClick={handlelogin}>
           Click Here
      </Button>
        </div>
    
     </div>
  
  ):(
    <div className="App">
       <Home user={user} handlelogout={handlelogout}/>
    </div>
  );


}

export default App;
