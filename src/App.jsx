import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
const toggleFinished = (e) => {
  setshowFinished(!showFinished)
}


const handleEdit = (e, id)=>{
let t = todos.filter(i=>i.id === id)
setTodo(t[0].todo)
let newTodos = todos.filter(item=>{
  return item.id!== id
})
setTodos(newTodos)
savetoLS()
}

const handleDelete = (e, id)=>{
let newTodos = todos.filter(item=>{
  return item.id!== id
})
setTodos(newTodos)
savetoLS()
} 

const handleAdd = ()=>{
setTodos ([...todos, {id: uuidv4(), todo, isCompleted: false}])
setTodo("")
savetoLS()
}

const handleChange = (e)=>{
  setTodo(e.target.value)
}

const handleCheckbox = (e)=>{
  let id = e.target.name;
  let index = todos.findIndex(item=> {
    return item.id === id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  savetoLS()
}

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl underline">iTask- Manage all your tasks at one place</h1>
        <div className="addTodo">
          <h2 className="font-bold text-lg my-5">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1"/>
          <button onClick={handleAdd } disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md w-full my-3">Save</button>
        </div>
        <input className="my-4 mx-2" onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />Show Finished
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {todos.length=== 0 && <div className="m-5">No Todo to display</div>}
          {todos.map(item=>{

          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
            <div className="flex gap-5"> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=> {handleEdit(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg font-bold text-white rounded-md mx-1"><FaEdit /></button>
              <button onClick={(e)=> {handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-lg font-bold text-white rounded-md mx-1"><MdDeleteSweep />
              </button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
