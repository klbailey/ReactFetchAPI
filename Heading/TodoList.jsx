import React, { useState } from "react";

const TodoList = ({todos, setTodos, userURL}) => {
    const deleteUser = () => {
        //Delete user
        fetch(userURL, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            // body: JSON.stringify([])
        })
        setTodos("");
    
    }
    
    const deleteHandler = (index) => {
        // setTodos(todos.filter((el,idx) => idx !== index));
        //deleted task update/put on API
    
        let newTodoArray = todos.filter((item, i) => i != index);
        setTodos(newTodoArray);
        fetch(userURL, {
            method: "PUT",
            headers: {"Content-Type": "application/json",
        }, body: JSON.stringify(newTodoArray)
        })
        //validate reponse
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then((response)=>
                {
                    response.status === 200?setTodos(newTodoArray) : "yikes";
                }
            )
    };
    
    const completeHandler = (index) => {
        let newTodoArray = todos.map((item,idx) => {
            
            //Array of objects/switch completed from false to true & vice versa
            if(idx === index) {
                return {
                   ...item , done: !item.done
                };
            }
            //return whatever did not match 
            return item;  
        })
        setTodos(newTodoArray)
        fetch(userURL, {
            method: "PUT",
            headers: {"Content-Type": "application/json",
        }, body: JSON.stringify(newTodoArray)
        })
        //validate reponse
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then((response)=>
                {
                    response.status === 200?setTodos(newTodoArray) : "yikes";
                }
            )
    }
    console.log(todos);
    return (
        <div className="todo-container">
            <ul className="todo-list ps-0">
                {todos.length>=1 ? todos.map((todo,index) => (
                    
                //for each todo from state render a todo component/comes from home

                        <li className={`todo-item ${todo.done ? "completed" : ''}`}>{todo.label}
                            <button onClick={()=>completeHandler(index)} className="complete-btn"><i className="fas fa-check"></i></button>
                            <button onClick={()=>deleteHandler(index)} className="trash-btn"><i className="fas fa-trash"></i></button>
                        </li>

                )): ""}
                <div className="abc d-flex">
                    {todos.length==1 ? `${todos.length} item left` : 
                            todos.length>1 ? `${todos.length} items left` : "Hooray, all tasks completed."}
                    <button onClick={()=>deleteUser()} className="btn btn-danger">Clear all</button>
                </div>
            </ul>
            
        </div>
    );
};

export default TodoList;
