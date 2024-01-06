import React from "react";
import { useState } from "react";

const Todolist=()=>{
    const [todo,setTodo] = useState("");
    const [newtodo,setNewtodo]=useState([]);   //new state to store the new todo 
    const [show,setshow]=useState(false);
    const [editindex,setEdit]=useState();      //one more state to store the edited values

    const handleAdd=()=>{
        // console.log(todo);
        if(todo.length!==0){
        setNewtodo(newData=>[newData,...todo]);
        }
        setTodo("");            //to make the input set to none again
    }
    // console.log(newtodo);

    const handleEdit =(index) =>{
        setTodo(newtodo[index]);
        setshow(true);     //to show the update button
        setEdit(index);
    }

    const handleUpdate=()=>{
        newtodo.splice(editindex,1,todo);
        setNewtodo([...newtodo]);   //to update the state
        setshow(false);  //to show the add button
        setTodo("");  
    }

    const handleDelete = (index) =>{
        //console.log(index);
        newtodo.splice(index,1);     //to remove only 1 index in 1 click
        setNewtodo([...newtodo]);    //to update the state
    }


    return (
        <div className="todo">
            <h2>TODO LIST</h2>
            <input
            type="text"
            value={todo}   //input value matching the state value
            onChange={(e)=>setTodo(e.target.value)}    //update the state variable in each change
            ></input>

            {!show?<button onClick={handleAdd}>Add</button>:
            <button onClick={handleUpdate}>Update</button>};

            {
                newtodo.map((val,index) =>
                <div>
                <li>{val}</li>
                <button className="edit" onClick={()=>handleEdit(index)} >Edit</button>
                <button className="delete" onClick={()=>handleDelete(index)}>Delete</button>
                </div>
                )
            }
        </div>
    );
};
export default Todolist;