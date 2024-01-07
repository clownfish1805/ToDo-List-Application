import React from "react";
import { useState,useEffect } from "react";
import './todo.css';

const Todolist=()=>{
    const [todo,setTodo] = useState("");
    const [newtodo,setNewtodo]=useState([]);   //new state to store the new todo 
    const [show,setshow]=useState(false);
    const [editindex,setEdit]=useState();      //one more state to store the edited values


    useEffect(() => {
        // Load tasks from local storage on component mount
        const localTasks = JSON.parse(localStorage.getItem("localTasks"));
        // if (localTasks ) {
        //     setNewtodo(localTasks);
        // }

        if (localTasks && Array.isArray(localTasks)) {
            setNewtodo(localTasks);
        }
    }, []);

    const updateLocalStorage = (todos) => {
        localStorage.setItem("localTasks", JSON.stringify(todos));
    };


    const handleAdd=()=>{
        // console.log(todo);
        // if(todo.length!==0){
        //     const newData={id:new Date().getTime(),todo:todo};
        //     setNewtodo((prevTodos) => [...prevTodos, newData]);
        // //localStorage.setItem("localTasks",JSON.stringify([...newtodo, newData]))
        // setTodo("");           //to make the input set to none again
        // }

        if (todo.length !== 0) {
            const newData = { id: new Date().getTime(), todo: todo };
            const updatedTodos = [...newtodo, newData];
            setNewtodo(updatedTodos);
            setTodo("");
            updateLocalStorage(updatedTodos);
        }

        
    }
    // console.log(newtodo);

    const handleEdit =(index) =>{
        setTodo(newtodo[index].todo);
        setshow(true);     //to show the update button
        setEdit(index);
    }

   // const handleUpdate=()=>{
    //     newtodo.splice(editindex,1,todo);
    //     setNewtodo([...newtodo]);   //to update the state
    //     setshow(false);  //to show the add button
    //     setTodo("");
    //     updateLocalStorage(...newtodo); 
    
    // const handleUpdate = () => {
    //     if (todo.length !== 0 && editindex !== null) {
    //         const updatedTodos = [...newtodo];
    //         updatedTodos[editindex].todo = todo;
    //         setNewtodo(updatedTodos);
    //         setshow(false);
    //         setTodo("");
    //         setEdit(null);
    //         updateLocalStorage(updatedTodos);
    //     }
    // }

    const handleUpdate = () => {
        if (todo.length !== 0 && editindex !== null) {
            const updatedTodos = newtodo.map((item, index) => {
                if (index === editindex) {
                    return { ...item, todo: todo };
                }
                return item;
            });
            setNewtodo(updatedTodos);
            setshow(false);
            setTodo("");
            setEdit(null);
            updateLocalStorage(updatedTodos);
        }
    }
    

    const handleDelete = (index) =>{
       
    //     newtodo.splice(index,1);     //to remove only 1 index in 1 click
    //     setNewtodo([...newtodo]);    //to update the state
    //    //localStorage.setItem("localTasks",JSON.stringify([...newtodo]));
    //    updateLocalStorage(...newtodo);


       const updatedTodos = newtodo.filter((_, i) => i !== index);
       setNewtodo(updatedTodos);
       updateLocalStorage(updatedTodos);
    }


    return (
        <div className="todo">
            <h2>TODO LIST</h2>
            <input
            type="text"
            placeholder="Add a new task"
            value={todo}   //input value matching the state value
            onChange={(e)=>setTodo(e.target.value)}    //update the state variable in each change
            ></input>
            
            {!show?<button onClick={handleAdd}>Add</button>:
            <button onClick={handleUpdate}>Update</button>} 
            <ul className="todos">
            {newtodo.map((val, i) => (
                    <li key={i}>
                        <input type="checkbox"/>{val.todo}
                        <button className="edit" onClick={() => handleEdit(i)}>Edit</button> 
                        <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};
export default Todolist;
