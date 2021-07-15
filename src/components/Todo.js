import React,{useEffect, useState} from 'react'
import TodoItem from "./TodoItem";
import DraggableList from './DraggableList';


function Todo() {

    const [todoItems, setTodoItems] = useState(null);
    const [myValue, setmyValue] = useState(null);


    useEffect(() => {
      //do something on load
      console.log("Hey, I have loaded up");
           
  
      if(!todoItems){
      fetch(("http://localhost:8080/api/todoItems"))
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo items list:  ", data[0].task);
        setTodoItems(data);
        setmyValue(data.task);
      });
    }
    } , [todoItems]);
  
  
    function addNewTodoItem (){
      fetch("http://localhost:8080/api/todoItems", {
        headers:{
          "content-type": "application/json",
        },
        method: 'POST',
       })
      .then((response) => response.json())
      .then((aTodoItem) => {
        console.log(aTodoItem);
       setTodoItems([...todoItems,aTodoItem]);
      });
  
    }
  
    function handleDeleteTodoItem(item){
     const updatedTodoItems = todoItems.filter(
       (aTodoItem) => aTodoItem.id !==item.id
       );
     setTodoItems([...updatedTodoItems]);
     }
     
     


     return (
        <div>
            <div>
        <button onClick={addNewTodoItem}>Add new Item </button>
      </div>
      <div> {
      todoItems 
           ?  todoItems.map((todoItem) => {
                return <TodoItem key={todoItem.id} data={todoItem} 
                emitDeleteTodoItem = {handleDeleteTodoItem} />;       
          }) 
        : "loading data...."}
       
      </div>
      <DraggableList handleDelete = {handleDeleteTodoItem} getItem={todoItems} />
      </div>
     );

   
}

export default Todo;
