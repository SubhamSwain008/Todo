import axios from 'axios';
import { useState ,useEffect, useRef} from 'react'

function App() {
const [msg,setMessage]=useState("Loading");
const [msglist,setMessglist]=useState([]);
const [currentTask,setCurrentTask]=useState("");
const [idxfordel,setIdxfordel]=useState(-1);
const input1=useRef(null);

const getWel=async()=>{
  try{
       const hello =await axios.get('https://todo-backend-5o0c.onrender.com/');
    
       console.log(hello.data.fast);
       setMessage("")
       setMessglist([]);
       for(let i=0;i<hello.data.fast.length;i++){
        
        setMessglist(m=>[...m,hello.data.fast[i]['dec']])
        setCurrentTask("")

       }      
  }
  catch(e){
    console.log(e)
  }
}
const addnewTask=async()=>{
  let now = new Date();
let time = now.toLocaleTimeString();
let date= now.toLocaleDateString();
if(currentTask!=""){
 const added=await axios.post('https://todo-backend-5o0c.onrender.com/add', {
      fast:`Date:${date},${currentTask}, time:(${time})`
    });}
if(currentTask=="")alert("no blank task please");
setMessglist([]);
 getWel();
}
  useEffect(() => {
     let now = new Date();
let time = now.toLocaleTimeString();
let date= now.toLocaleDateString();
console.log(`Date:${date},currentTask, time:(${time})`)
    setMessglist([]);
    getWel();
  }, []);

  useEffect(()=>{
    (async()=>{
      const deleted= await axios.delete('https://todo-backend-5o0c.onrender.com/del', {
      data:{fast: String(msglist[idxfordel])}
    });
    console.log(deleted);
    setMessglist([]);
    getWel();
    })()
  },[idxfordel])

  return (
    <>
    <div style={{maxWidth:"600px",margin:"40px auto",padding:"20px 30px",background:"white",borderRadius:"16px",boxShadow:"0 6px 16px rgba(0,0,0,0.15)",fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
      <h1 style={{textAlign:"center",color:"#333",marginBottom:"20px"}}>Task Lists</h1>
      <h2 style={{textAlign:"center",color:"#777"}}>{msg}</h2>
    
      <ul style={{listStyle:"none",padding:0,margin:"20px 0"}}>
        {msglist.map((value,idx)=>(
          <li key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#f8f8f8",marginBottom:"10px",padding:"12px 16px",borderRadius:"8px",transition:"background 0.2s"}}>
            <span>{value}</span>
            <button
              style={{background:"#ff5c5c",color:"white",border:"none",padding:"6px 12px",borderRadius:"6px",cursor:"pointer"}}
              onClick={()=>{setIdxfordel(idx);}}
            >X</button>
          </li>
        ))}
      </ul>

      <div style={{marginTop:"30px",textAlign:"center"}}>
        <h2>Add a new task</h2>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"10px"}}>
          <input 
            ref={input1} 
            type="text" 
            id="input1"
            placeholder="Enter task here..."
            onChange={(e)=> setCurrentTask(e.target.value)}
            style={{flex:1,padding:"10px 14px",border:"1px solid #ccc",borderRadius:"8px",fontSize:"14px"}}
          />
          <button
            style={{background:"#4CAF50",color:"white",border:"none",padding:"10px 16px",borderRadius:"8px",cursor:"pointer"}}
            onClick={()=>{
              addnewTask();
              input1.current.value=""
            }}
          >Submit</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App