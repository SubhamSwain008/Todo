import axios from 'axios';
import { useState ,useEffect} from 'react'


function App() {
const [msg,setMessage]=useState("Loading");
const getWel=async()=>{
  try{
       const hello =await axios.get('http://127.0.0.1:8000/');
       let msg1=[]
       console.log(hello.data.fast);
       setMessage("")
       for(let i=0;i<hello.data.fast.length;i++){
        
        msg1.push(hello.data.fast[i]['dec'])
        setMessage(m=>m+hello.data.fast[i]['dec'])
        console.log(msg1)

       }
       

      //  setMessage(m=>m=hello.data.fast);
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
