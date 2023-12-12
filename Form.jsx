import React from "react";


const Form = ({setInputText, todos, setTodos, inputText, userURL}) => {

    //Get todos
    const addTodo = () => {
        
    };
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        //Passing info into here
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) => {
        let newTodoArray = [...todos, {label: inputText, done: false}]
        console.log(newTodoArray)
        fetch(userURL, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTodoArray)
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
        e.preventDefault();
        //submit/create object with the data
        setTodos(newTodoArray)
            //[


            //if something in there already just pass it/add any new ones/
            // ...todos, {text: inputText, completed: false, id: Math.random() * 1000},
        //]
    
        setInputText("");
    }
    return (
        <form>
            <input placeholder="What needs to be done?" value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <button onClick={submitTodoHandler} className="todo-button"></button>                  
        </form>
    )
};

export default Form
