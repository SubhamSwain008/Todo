import axios from 'axios';
import { useState ,useEffect, useRef} from 'react'


function App() {
const [msg,setMessage]=useState("Loading");
const [msglist,setMessglist]=useState([]);
const [currentTask,setCurrentTask]=useState("");
const [idxfordel,setIdxfordel]=useState(-1);
const input1=useRef(null);

const getWel=async()=>{
  try{setMessglist([])
       const hello =await axios.get('https://todo-backend-5o0c.onrender.com/');
    
       console.log(hello.data.fast);
       setMessage("")
       for(let i=0;i<hello.data.fast.length;i++){
        
        setMessglist(m=>[...m,hello.data.fast[i]['dec']])
        setCurrentTask("")
        // console.log(msglist)

       }      
  }
  catch(e){
    console.log(e)
  }
}
const addnewTask=async()=>{
  let now = new Date();
let time = now.toLocaleTimeString();
if(currentTask!=""){
 const added=await axios.post('https://todo-backend-5o0c.onrender.com/add', {
      fast: currentTask+`(${time})`
    });}
if(currentTask=="")alert("no blank task please")
//  console.log(added);
 getWel();
}
  useEffect(() => {
    getWel();
  }, []);

  useEffect(()=>{
    (async()=>{
      const deleted= await axios.delete('https://todo-backend-5o0c.onrender.com/del', {
      data:{fast: String(msglist[idxfordel])}
    });
    console.log(deleted);
    getWel();
    })()
  },[idxfordel])

  return (
    <>
    <div style={{justifyContent:"center",justifyItems:"center"}}>
    <h1 style={{background:"red",justifySelf:"center"}}>Task lists </h1>
    <h1>{msg}</h1>
    
   <h1>
    <ul>
      {msglist.map((value,idx)=>(<li key={idx}>{value}
        <button
        onClick={()=>{
          setIdxfordel(idx);
        }}
        >X</button>
      </li>))}
    </ul>
      </h1>

      <div>
        <h1>Add more task:
  {currentTask}
</h1>
 <h1>
        <input ref={input1} type="text" name="" id="input1" 
        onChange={(e)=>
          
          setCurrentTask(e.target.value)}
        ></input>
        <button
        onClick={()=>{addnewTask()
          input1.current.value=""
        }}
        >Submit</button>
</h1>
      </div>
      </div>
    </>
  )
}

export default App
