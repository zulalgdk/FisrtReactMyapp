import React, { Component} from 'react'
import axios from "axios";

const UserContext = React.createContext();
//provider,consumer
const reducer = (state,action) =>{ /*reducer için gerekli parametreler action ve state*/

  switch (action.type){
    
    case "DELETE_USER": /*type=delete_user*/
      return {  /*yeni state i return ediyoruz*/
          ...state, /*eski state*/
          users : state.users.filter(user=> action.payload !== user.id)  /* onclikten gelen id !== üzerinde gezinilen id */
        }
    
    case "ADD_USER":
      return { 
        ...state,
         users : [...state.users,action.payload] 
      }
    
      case "UPDATE_USER":
      return { 
        ...state,
        users :state.users.map(user=> user.id ===action.payload.id ? action.payload : user) 
        //map fonk ile her  user dizisi üzerinde geziniyor , user id eğer o anki güncellenmiş user id ye eşit ise action gerçekleşiyo 
        //eğer eşit değilse user ı dönüyoruz
      }

    default :
        return state
  }
}

export  class UserProvider extends Component {
    state = {
    
        users: [],
        dispatch : action => {
          this.setState(state => reducer(state,action))
        }
      }
      //alt componentlerden gelen actionları dispatch ile reducera gönderiyoruz.
      //reducer dan güncellenmiş state gelecek ve setstate ile güncelleme yapacağız.
      componentDidMount = async () => {
        const response = await axios.get("http://localhost:3003/users")//get request yapıp await ile gelecek datayı bekleyip sonrasında verileri response atıyoruz.
        this.setState ({
          users : response.data //state ime datamı ekliyorum
        })  
      }
      
  render() {
    return (
     <UserContext.Provider value = {this.state}>
         {this.props.children}
     </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;

 
