import React,{useEffect, useState} from 'react';

// import './components/Navbar.css';




const TodoItem = (props) => {
   const{ emitDeleteTodoItem} = props;
   const [todoItem, setTodoItem] = useState(props.data); 
   const[isDirty, setDirty] = useState(false);
  useEffect(() =>{
      if(isDirty){
      fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`,{
          method:'PUT',
          headers:{
            "content-type": "application/json",
          },
          body: JSON.stringify(todoItem),
      })
      .then(response => response.json())
      .then((data)=>{
       setDirty(false);
       setTodoItem(data);
      });
    }
   },[todoItem,isDirty]); 

   /////////////////Creating Function for Cards////////////////////

  //  const dragStart = e=> {
  //    const target = e.target;
  //    e.dataTransfer.setData('card_id',target.id);

  //    setTimeout(()=>{
  //      e.stopPropagation();
  //    })

  //  }

   useEffect(() => {
     console.log(todoItem.task);
   }, [todoItem]);


   function updateTask(e){
     setDirty(true)
     setTodoItem({...todoItem, task: e.target.value});
   }
  
   function deleteTodoItem(){
    fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`,{
      method:'DELETE',
      headers:{
        "content-type": "application/json",
      },
      
     })
      .then(response => {
         emitDeleteTodoItem (todoItem);
      
    })
   }

return(
        <div>        
            <input type ="checkbox" 
            checked ={todoItem.isDone}
            onChange={() => {
            setDirty(true);
            setTodoItem({...todoItem, isDone : !todoItem.isDone});
            }}/>

            {
              todoItem.isDone ?
              (<span style={{ textDecoration: "line-through"}}>{todoItem.task}</span>
              ) :( 
              <input type = 'text' value= {todoItem.task} onChange= {updateTask}/>
              )}
              <span style ={{ marginLeft: "2rem", cursor: "pointer"}}
              onClick ={deleteTodoItem}>🗑️</span>
          </div> 
   );
 
};
export default TodoItem;

 