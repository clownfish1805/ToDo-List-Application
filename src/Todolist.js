import React from "react";
import { useState,useEffect } from "react";
import './todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Todolist=()=>{
    const [todo,setTodo] = useState("");
    const [newtodo,setNewtodo]=useState([]);   //new state to store the new todo 
    const [show,setshow]=useState(false);
    const [editindex,setEdit]=useState();      //one more state to store the edited values
    const [priority, setPriority] = useState(""); // State to store priority


    useEffect(() => {
        // Load tasks from local storage on component 
        const localTasks = JSON.parse(localStorage.getItem("localTasks"));
      
        if (localTasks && Array.isArray(localTasks)) {       // no new empty array should be inserted
            setNewtodo(localTasks);               //updates the newtodo with localtask value
        }
    }, []);

    const updateLocalStorage = (todos) => {
        localStorage.setItem("localTasks", JSON.stringify(todos));
    };


    const handleAdd=()=>{
        // console.log(todo);

        if (todo.length !== 0) {
            const newData = { id: new Date().getTime(), todo: todo };
            const updatedTodos = [...newtodo, newData];
            setNewtodo(updatedTodos);
            setTodo("");                 //to make the input set to none again
            setPriority(""); // Reset priority after adding
            updateLocalStorage(updatedTodos);      //update the local storage 
        }
    }
    

    const handleEdit =(index) =>{
        setTodo(newtodo[index].todo);
        setshow(true);     //to show the update button
        setEdit(index);
    }

    const handleUpdate = () => {
        if (todo.length !== 0 && editindex !== null) {
            const updatedTodos = newtodo.map((item, index) => {
                if (index === editindex) {
                    return { ...item, todo: todo , priority: priority};
                }
                return item;
            });
            setNewtodo(updatedTodos);
            setshow(false);      //to show the add button
            setTodo("");
            setEdit(null);
            setPriority(""); // Reset priority after updating
            updateLocalStorage(updatedTodos);
        }
    }
    

    const handleDelete = (index) =>{
       const updatedTodos = newtodo.filter((_, i) => i !== index);
       setNewtodo(updatedTodos);    //to update the state
       updateLocalStorage(updatedTodos);
    }

    const handleCheckboxChange = (id) => {
        const updatedTodos = newtodo.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setNewtodo(updatedTodos);
        updateLocalStorage(updatedTodos);
    };


    const handlePriorityChange = (e) => {
        const priorityValue = e.target.value;
    setPriority(priorityValue);

    };



    return (

         <div className="todo">
        <h2>TO-DO LIST</h2>
        <br></br>
        <input
            type="text"
            placeholder="Add a new task"
            value={todo}    //input value matching the state value
            onChange={(e) => setTodo(e.target.value)}    //update the state variable in each change
        />
        
        {!show ?
            <button onClick={handleAdd}>Add</button> :
            <button onClick={handleUpdate}>Update</button>}

<div>
                <label>
                    Priority:  &nbsp;
                    <input
                        type="radio"
                        value="asap"
                        checked={priority === "asap"}
                        onChange={handlePriorityChange}
                    />
                    ASAP &nbsp;
                </label>
                <label>
                    <input
                        type="radio"
                        value="later"
                        checked={priority === "later"}
                        onChange={handlePriorityChange}
                    />
                     Later
                </label>
            </div>

            <br></br>
            <br></br>

       <table className="totodo">
        <br></br>

                <tr>
                    <th>Status</th>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            
            <tbody>
                {newtodo.map((val, i) => (
                    <tr key={i}>
                        <td className="checkbox">
                            <input type="checkbox"
                            checked={val.completed}
                            onChange={() => handleCheckboxChange(val.id)} />
                        </td>
                        <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>{val.todo}</td>
                        {/* <td>{val.todo}</td> */}
                        <td>{val.priority || "None"}</td> {/* Display priority, if set, otherwise "None" */}
                        <td><button className="btn btn-success" onClick={() => handleEdit(i)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={() => handleDelete(i)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>

            <br></br>

        </table>
    </div>
    );
};
export default Todolist;

