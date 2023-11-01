import {useRef,useEffect, useState}from 'react';
import CheckIcon from '@mui/icons-material/Check'; 
import DeleteIcon from '@mui/icons-material/Delete';

import './App.css';

function App() { 
  
  const [todolist, setTodolist] = useState([])
  const [message, setMessage] = useState('');

  const inputRef = useRef()

  useEffect(() => {
    const savedTodolist = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodolist) {
    setTodolist(savedTodolist);
    }
  }, []);

  const handelAddTodo =()=>{
  const text = inputRef.current.value;
  const newItem ={completed : false,text}
  setTodolist([...todolist,newItem])
  inputRef.current.value=("")

  console.log(text)
}

const handelItemDone=(index)=>{
  const newTodos=[...todolist]
  newTodos[index].completed=!newTodos[index].completed
  setTodolist(newTodos);
  localStorage.setItem('todolist', JSON.stringify(newTodos));
}


const handleDeleteItem = (index) => {
  const newTodos = [...todolist];
  const deleteItem = newTodos.splice(index, 1)[0]; 
  setTodolist(newTodos);

  localStorage.setItem('todolist', JSON.stringify(newTodos));
  setMessage(`Cette tâche a été supprimée avec succès "${deleteItem.text}"`);
  setTimeout(() => {
    setMessage('');
  }, 3000);
}


return (
  <div className="App">
    
      <h2>Todolist reda </h2>
      <div className="todolist">
      <ul>
        {todolist.map(({text,completed}, index) => {
      return ( 
        <div className='item'>
      <li className={completed ? "done":""}
       key={index}
        onClick={() => handelItemDone(index)}
        >
            {text}
          </li>
          <CheckIcon className='completed' style={{ color: completed ? 'green' : 'red' }} />
          <DeleteIcon className='trash'
              onClick={() => handleDeleteItem(index)} 
                />


          </div>
      );
      })}
      </ul>
      <input ref={inputRef} placeholder='Rentrez la tâche à effectuer' />
      <button onClick={handelAddTodo}>Ajouter</button> 
     
    </div>
   <div className="message">{message}</div>
  </div>
);
}
export default App;