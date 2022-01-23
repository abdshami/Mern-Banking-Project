import './App.css';
import React, {useState,useEffect} from 'react'
import reactDom from 'react-dom'
import Axios from 'axios';
//import { user } from '../../backend/routes/user';







function App() { 

let count = 1;

const [userName,setUserName]= useState("")
const [userId,setUserId]= useState("")
const [cash,setCash]= useState(0)
const [credit,setCredit]= useState(0)
const [isActive,setIsActive]= useState(true)
const [usersList,setUsersList] = useState([])

const [error,setError]= useState("")

useEffect(()=>{
  Axios.get('http://localhost:7000/bank').then((res)=>{
      setUsersList(res.data.data)
  })
},[])


const addUser = ()=>{
      if (!userId){
          Axios.post('http://localhost:7000/bank', {
            Uname: userName,
            cash:cash,
            credit:credit,
            isActive:isActive         
          })
        
          Axios.get('http://localhost:7000/bank').then((res)=>{
            setUsersList(res.data.data)
          })

          setError("")
      } else{
         
            setError("User is duplicated")

      } 
}


const updateUser = (id) =>{
  Axios.put(`http://localhost:7000/bank/${id}`,{
    Uname: userName,
    cash:cash,
    credit:credit,
    isActive:isActive         
  })

  Axios.get('http://localhost:7000/bank').then((res)=>{
    setUsersList(res.data.data)
  })
  
  
   
}


const deleteUser = (id) =>{
      Axios.delete(`http://localhost:7000/bank/${id}`).then((data)=>{
          
      })

      Axios.get('http://localhost:7000/bank').then((res)=>{
          setUsersList(res.data.data)
      })

      setError("")
}



const getUser = (id) =>{
  Axios.get(`http://localhost:7000/bank/${id}`).then((res)=>{
     setUserName(res.data.user.Uname)
     setCash(res.data.user.cash)
     setCredit(res.data.user.credit)
     setIsActive(res.data.user.isActive)
     setUserId(res.data.user._id)
  })

  setError("")

}


  return (
    <div className="App">

      <div className='user'>  
          
              <h1>Bank Application</h1>

              
              <label>User Name:</label>
              <input type="text" className='input' value={userName} onChange={(event)=>{setUserName(event.target.value)}}/>
              <label>Cash:</label>
              <input type="number" className='input' value={cash} onChange={(event)=>{setCash(event.target.value)}}/>
              <label>Credit:</label>
              <input type="number" className='input' value={credit} onChange={(event)=>{setCredit(event.target.value)}}/>
              <label>Is Active:</label>
              <input type="boolean" className='input' value={isActive} onChange={(event)=>{setIsActive(event.target.value)}}/>

              
              <div className='div'>

                  <label  className='label'>User ID :<span className='error-span'> {error}</span>  </label>
                  <input type="text" value={userId} onChange={(event)=>{setUserId(event.target.value)}}/>

              </div>
              <div>
                  <button className='btn-add btn'  onClick={addUser}>Add User</button>
                  <button className='btn-update btn' name={userId}  onClick={(event)=>{updateUser(event.target.name)}}>Update User</button>
              </div>
     </div>  

     <div className='list'>
          
          <h1>Users List</h1>

          <table >
             
            {usersList.map((user,key) => {
            return(   
                    <tr key={key}>
                            <td > {count++} </td>  <td>User Id : {user._id} </td>  <td> UserName : {user.Uname} </td>  <td> Cash : {user.cash} </td> 
                            <td> Credit : {user.credit} </td>  <td> IsActive : {user.isActive.toString()}</td> <td> 
                            <button onClick= {()=>{deleteUser(user._id)}} className='btn-del btn' >Delete</button> </td> 
                            <td> <button  onClick= {()=>{getUser(user._id)}} className='btn-get btn'>Get User</button> </td>
                    </tr>
                  ) 
                 })}

          </table>
      </div>
        
  </div>
  );


 
  }

  





export default App;
