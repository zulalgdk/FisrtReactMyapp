import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context";
import axios from "axios";
import {Link} from "react-router-dom";
class User extends Component {

 state ={
   isVisible : false
 }

 onClickEvent = (e) =>{
   this.setState({
     isVisible : !this.state.isVisible
   })    
 }

 onDeleteUser = async (dispatch,e) => {
   const {id} = this.props;
   await axios.delete(`http://localhost:3003/users/${id}`); // önce rest api den ilgili id yi silip sonra state ten kaldırıyoruz.
   dispatch({type:"DELETE_USER", payload:id}); 
 }
  render() {
    const {id,Name,Meslek,Maas}=this.props;
    const{isVisible}=this.state;
    
    return (
      <UserConsumer>
        {
             value => {
               const {dispatch} =value;
               return (
                <div className= "col-md-8 mb-4">
                  <div className ="card" style= {isVisible ? {backgroundColor : "#8691f0" , color : "white"} : null}>
                    <div className ="card-header d-flex justify-content-between">
                        <h4 className="d-inline" onClick = {this.onClickEvent}>{Name}</h4>
                        <i onClick = {this.onDeleteUser.bind(this,dispatch)} className="fas fa-trash-alt" style = {{cursor : "pointer"}}></i>
                    </div>
                   {
                     isVisible ? 
                     <div className="card-body">
                     <p className="card-text">Meslek: {Meslek}</p> 
                     <p className="card-text">Maaş: {Maas}</p>
                     <Link to = {`edit/${id}`} className="btn btn-dark btn-block">User Update </Link>
                     </div> :null
                   }
              
              
              
                  </div>
                </div>
              )
             }
        }

      </UserConsumer>
    )

  }
}

User.propTypes = {
  Name: PropTypes.string.isRequired,
  Meslek: PropTypes.string.isRequired,
  Maas: PropTypes.string.isRequired,
  id : PropTypes.string.isRequired  
}
export default User;
