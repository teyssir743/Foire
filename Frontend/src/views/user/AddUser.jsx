import  {useState} from 'react'
import axios from'axios'
import { toast , ToastContainer} from 'react-toastify';


function AddUser() {

    const [user, setUser]= useState(null)


  
    const createUser =()=>{
      console.log(user)
        axios.post("http://localhost:5000/api/user/createUser" , user)
        .then (()=>{toast.success("utilisateur  ajouter avec sucess !")
      }).catch(()=>{toast.error('quelque chose va pas correctement ! ')})
      }


    return (
    <>
    <div>AddUser</div>
    <ToastContainer/>

         <label>username:</label>
         <input type="Text" name="" id=""  onChange={e =>setUser({...user,username:e.target.value})}/>
         <br/>


         <label>lastname:</label>
         <input type="Text" name="" id="" onChange={e =>setUser({...user,lastname:e.target.value})} />
         <br/>

         
         <label>dateNaissance:</label>
         <input type="Date" name="" id="" onChange={e =>setUser({...user,dateNaissance:e.target.value})} />
         <br/>


         <label>email:</label>
         <input type="email" name="" id=""  onChange={e =>setUser({...user,email:e.target.value})}/>
         <br/>

        <button type="submit" onClick={createUser}>ajouter</button>
         <br/>
         

  </>)
}


export default AddUser

// ...user : diffusion des ancienne valeur + ajouter les new valeur  qui se trouve dans target value


