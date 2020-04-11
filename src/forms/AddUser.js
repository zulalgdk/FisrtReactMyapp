import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from "../context";
import axios from "axios";

const Animation = posed.div({
    visible : { 
        opacity : 1, 
        applyAtStart : {
            display :  "block"
        }    
    },
    hidden : {
        opacity : 0,
        applyAtEnd : {
            display :  "none"
        }
    }
});

class AddUser extends Component {
    state = {
        visible : false,
        Name : "",
        Meslek : "",
        Maas :"",
        error : false
    }
    changeVisibility = (e) => {
        this.setState ({
            visible : !this.state.visible
        })
    }

    validateForm = () => {
      const {Name,Meslek,Maas} = this.state;
      if(Name ==="" || Meslek ==="" || Maas ==="" ){
          return false;
      }
      return true;
    }

    changeInput = (e) => { 
        this.setState({
            [e.target.name] : e.target.value
        })
    } //input içerisine yazdığım her değişikliği algılaması için 
    
    addUser = async (dispatch,e) => {
        e.preventDefault(); //addUser ın default özelliği butona bastıktan sonra sayfayı yenilemeisi bunu engellemek için yazıldı.
        const {Name,Meslek,Maas} = this.state; //kaydedeceğim değerlerimi stateten alıyorum
        const newUser = { //yeni obje oluşturuyoruz.
            Name: Name,
            Meslek: Meslek,
            Maas: Maas
        }

        if(!this.validateForm()){ //eğer validateformdan false değer dönmüşse yani değer true ise
            this.setState({
                error :true
            })
            return;//alt işlemlere geçmemesi için fonk return ile sonlandırıyoruz.
        }

        const response = await axios.post("http://localhost:3003/users",newUser); //newuserımı sunucuya gönderip
        dispatch({type : "ADD_USER", payload : response.data}); // stateimde respose mu gösteriyorum
        this.props.history.push("/"); //redirect ekleme işleminden sonra anasayfaya yönlenditriyorum.
    }
  render() {
      const {visible,Name,Meslek,Maas,error} = this.state;
     return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className = "col-md-8 mb-4">
                        <button onClick = {this.changeVisibility}  className ="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                        <Animation pose = {visible ? "visible" : "hidden"}>
                         <div className ="card">
                             <div className ="card-header">
                                 <h4>Kullanıcı Ekle</h4>
                             </div> 
                             
                             {
                                 error ?
                                <div className="alert alert-danger">
                                    Lütfen bilgilerinzi kontrol ediniz. 
                                 </div>
                                 :null
                             }

                             <div className = "card-body">
                                 <form onSubmit = {this.addUser.bind(this,dispatch)}>
                                 <div className = "form-group">
                                     <label htmlFor ="Name">İsim</label>
                                     <input type="text"
                                      name="Name" 
                                      id= "Name"
                                      placeholder = "Adınız..."
                                      className ="form-control" 
                                      value ={Name} //value ya state değerlerini bağlıyoruz.
                                      onChange = {this.changeInput} 
                                     />         
                                 </div>
                                 <div className = "form-group">
                                     <label htmlFor ="Meslek">Meslek</label>
                                     <input type="text"
                                       name="Meslek"
                                       id= "Meslek" 
                                       placeholder = "Mesleğiniz..." 
                                       className ="form-control" 
                                       value ={Meslek} 
                                       onChange = {this.changeInput}
                                     />         
                                 </div>
                                 <div className = "form-group">
                                     <label htmlFor ="Maas">Maaş</label>
                                     <input type="text"
                                      name="Maas" 
                                      id= "Maas" 
                                      placeholder = "Maaşınız..." 
                                      className ="form-control" 
                                      value ={Maas} 
                                      onChange = {this.changeInput} 
                                     />         
                                 </div>
                                 <button  className= "btn btn-success btn-block" type= "submit">Add User</button>
                                 </form>
                             </div>
                         </div>
                         </Animation>
                     </div>
                 )
            }
        }

      </UserConsumer>
  }
}

export default AddUser;


