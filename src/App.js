import React from "react";
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import './App.css';

import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import TodoForm from "./components/TodoForm";
import DraggableList from "./components/DraggableList";

function App() {


  

  return(
      <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
      </Router>
      <Todo/>
      <TodoForm/>
  
     
    
    
      </>
  );
}


export default App;
