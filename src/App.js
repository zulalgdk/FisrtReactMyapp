import React,{Component} from 'react';
import NavBar from "./Layout/NavBar";
import Users from "./components/Users";
import AddUser from "./forms/AddUser";
import UpdateUser from "./forms/UpdateUser";
import NotFound from "./pages/NotFound";
import Contribute from "./pages/Contribute";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


class App extends Component {
         
  render() {
    return (
      <Router>
        <div className = "container">
         <NavBar title="User App"/>
         <hr/>
         <Switch>
         <Route exact path ="/" component = {Users}/> 
         <Route exact path ="/adduser" component = {AddUser}/>
         <Route exact path ="/githup" component = {Contribute}/>
         <Route exact path ="/edit/:id" component = {UpdateUser}/>
         <Route component = {NotFound}/>  
         </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

