import { useEffect, useState } from "react";
import {
  Button,
  EditableText,
  InputGroup
} from "@blueprintjs/core";
import { Toaster, toast } from 'react-hot-toast';
import "./App.css";


function App(){
    
      const [users,setUsers] = useState([]); 
      const [newuser,setNewuser ] = useState(""); 
      const [newEmail, setNewEmail] = useState("");
      const [newWebsite, setNewWebsite] = useState("");

      useEffect(()=> {
         async function UsersData(){
            try{
              const res = await fetch('https://jsonplaceholder.typicode.com/users');

                if(!res.ok){
                    throw new Error("Data Unable to fetch!!");
                    
                }
                const  data = await res.json(); 
                console.log(data);
                setUsers(data);
            }catch(err){
                console.log(err)
            }

         }
        UsersData()
      },[])

      function addUsers(){
       const name = newuser.trim(); 
       const email = newEmail.trim(); 
       const website = newWebsite.trim(); 

       if(name && email && website){
           fetch('https://jsonplaceholder.typicode.com/users',
            {
                method: "POST", 
                body: JSON.stringify({
                     name,
                     email, 
                     website
                }),
                headers : {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
           )
           .then((res)=>res.json())
           .then((data)=> {
            console.log(data) //shows the data which sent by POST method
               setUsers([...users,data]);
               toast.success("User Details Added Successfully!!!"); 
               setNewuser(""); 
               setNewEmail(""); 
               setNewWebsite("");
           })
           
       }
       else{
        toast.error("Please fill the required fields")
       }
      }
     
      function changeHandle(id, key, value){
           setUsers((users) =>{
             return  users.map((user)=> {
                 return user.id === id ? {...user, [key]:value} : user
               })
           })
      }
      
      function updateUser(id){
        const user = users.find((user)=>user.id === id)
         fetch(`https://jsonplaceholder.typicode.com/users/10`,
            {
                method: "PUT", 
                body: JSON.stringify(user),
                headers : {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }
           )
           .then((res)=>res.json())
           .then((data)=> {
            console.log(data) //shows the data which sent by PUT method
              toast.success("User Details Updated Successfully!!!"); 
           })
        
      }

      function DeleteUser(id){
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
           method: 'DELETE',
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
          setUsers((users) => {
               return users.filter((user)=> user.id !== id)
          })
          toast.success("User Deleted Successfully!!")
        })
      }
      return(
        <>
           <h1>User Details Management</h1>
            <div className="container">
            <div className="app">
                  <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped">
                        <thead>
                              <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Website</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                            {
                              users.map(user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td><EditableText onChange={values => changeHandle(user.id, "email", values)} value={user.email}/></td>
                                    <td><EditableText onChange={values => changeHandle(user.id, "website", values)} value={user.website}/></td>
                                    
                                    <td>
                                    <Button intent="primary" onClick={()=> updateUser(user.id)} >Update</Button>
                                    &nbsp;
                                    <Button intent="danger" onClick={()=>DeleteUser(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                              )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                <InputGroup value={newuser} placeholder="Enter Your Name" onChange={(e)=> setNewuser(e.target.value)}/>
                                </td>
                                <td>
                                <InputGroup value={newEmail} placeholder="Enter Your Email" onChange={(e)=>setNewEmail(e.target.value)}/>
                                </td>
                                <td>
                                <InputGroup value={newWebsite} placeholder="Enter Your Website" onChange={(e)=>setNewWebsite(e.target.value)}/>
                                </td>
                                <td>
                                    <Button onClick={addUsers} intent="success" style={{width:130}}>Add User</Button>
                                </td>                                                           
                            </tr>
                        </tfoot>
                  </table>
                  <Toaster position="top-center" />
            </div>
             </div>
            </>
       )

}

export default App;








