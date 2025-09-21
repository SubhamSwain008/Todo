import axios from 'axios';
import { useState ,useEffect} from 'react'


function App() {
const [msg,setMessage]=useState("Loading");
const getWel=async()=>{
  try{
       const hello =await axios.get('http://127.0.0.1:8000/');
       console.log(hello.data);
       setMessage(m=>m=hello.data.fast);
  }
  catch(e){
    console.log(e)
  }
 

 
}
  useEffect(() => {
    getWel();
  }, []);

  return (
    <>
    <h1>{msg}</h1>
      
    </>
  )
}

export default App
