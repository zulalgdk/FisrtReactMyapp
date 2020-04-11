import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from "axios";

class UpdateUser extends Component {
    
    state = {
        Name : "",
        Meslek : "",
        Maas :"",
        error : false
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
    componentDidMount = async() => {
        const {id} = this.props.match.params;
        const response = await axios.get (`http://localhost:3003/users/${id}`);
        const {Name,Meslek,Maas} = response.data;
        this.setState({
          Name,
          Meslek,
          Maas
        });
    }

    UpdateUser = async (dispatch,e) => {
        e.preventDefault(); //addUser ın default özelliği butona bastıktan sonra sayfayı yenilemeisi bunu engellemek için yazıldı.
        const{Name,Meslek,Maas}=this.state; //state ten mevcut değerleri alıyoruz.
        const {id} = this.props.match.params; //paramstan id yi alıyoruz
        const UpdateUser ={Name,Meslek,Maas}; //yenilenmiş kullanıcıyı alıyoruz

        if(!this.validateForm()){
            this.setState({
                error :true
            })
            return;
        }
        const response = await axios.put(`http://localhost:3003/users/${id}`,UpdateUser); //güncelleme işlemini serverda yapıp  veriyi response a atıyoruz
       dispatch({type: "UPDATE_USER",payload:response.data}); //güncellenmiş veriyi contexte gönderiyoruz.
        this.props.history.push("/");
    }

  render() {
      //console.log(this.props.match);
      const {Name,Meslek,Maas,error} = this.state;
     return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className = "col-md-8 mb-4">
                         <div className ="card">
                             <div className ="card-header">
                                 <h4>Update User</h4>
                             </div> 
                             {
                                 error ?
                                <div className="alert alert-danger">
                                    Lütfen bilgilerinzi kontrol ediniz. 
                                 </div>
                                 :null
                             }
                             <div className = "card-body">
                                 <form onSubmit = {this.UpdateUser.bind(this,dispatch)}>
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
                                 <button  className= "btn btn-success btn-block" type= "submit">Update User</button>
                                 </form>
                             </div>
                         </div>
                       
                     </div>
                 )
            }
        }

      </UserConsumer>
    
  }
}

export default UpdateUser;


