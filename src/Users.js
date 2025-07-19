import { Button, EditableText, InputGroup} from '@blueprintjs/core';
import { Toaster, toast } from 'react-hot-toast';
import './App.css'; 
import { useState, useEffect } from 'react';


function UsersManagementApp(){
  
    const [users,SetUsers] = useState([]);
    const[NewUser, SetNewUser] = useState("");
    const[NewEmail, SetNewEmail] = useState("");
    const[NewWebsite, SetNewWebsite] = useState("");

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((json) => {
            console.log(json);
            SetUsers(json);
        })
    },[])

// adding user details
   function addUser(){ 
    const name = NewUser.trim(); 
    const email = NewEmail.trim(); 
    const website = NewWebsite.trim();

    if(name && email && website){
        fetch(`https://jsonplaceholder.typicode.com/users`,{
            method : "POST", 
            body : JSON.stringify({
                name,
                email, 
                website
            }), 
            headers : {
                "Content-Type" : "application/json; charset=UTF-8"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
             SetUsers([...users, data])
             toast.success("User Details Added Successfully!!"); 

             SetNewUser(""); 
             SetNewEmail(""); 
             SetNewWebsite("")
        })
    }else{
        toast.error("Please fill the required fields")
    }
   }


    function ChangeHandle(id,key,value){
        SetUsers((users) => {
            return users.map(user => {
                return( 
                    user.id === id ? {...user, [key]: value} : user
                )
            })
        })
    }

// update user 
    function updateUser(id){
        const user = users.find(user=> user.id === id)
        fetch('https://jsonplaceholder.typicode.com/users/10', {
            method: 'PUT', 
            body: JSON.stringify(user),
            headers: {
                "Content-Type" : "application/json; charset=UTF-8",
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data); 
            toast.success("User Details Updated!")
        })
    }

    function deleteUser(id){ 
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method: 'DELETE'
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            SetUsers(users => {  
               return  users.filter((user)=>user.id !== id   //will get all users except deleted user
                )
            })
            toast.success('User deleted successfully')
        })
    }

    return(
        <>
        <h1>Users Management App</h1>
        <div className="app">          
            <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped center">
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
                          users.map(user => <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td><EditableText  onChange={value => ChangeHandle(user.id, "email", value) }  value={user.email}/></td>
                              <td><EditableText onChange={value => ChangeHandle(user.id, "website", value)}  value={user.website}/></td>
                              <td>
                                <Button intent='primary' onClick ={()=>updateUser(user.id)}>Update</Button>
                                &nbsp;
                                <Button intent='danger' onClick={()=>deleteUser(user.id)}>Delete</Button>
                              </td>
                          </tr>)
                        }
                    </tbody>
                    <tfoot>

                          <tr>
                            <td></td>
                            <td><InputGroup  value={NewUser} placeholder="Enter Your Name.." onChange={ (e) => SetNewUser(e.target.value)} /></td>
                            <td><InputGroup  value = {NewEmail} placeholder="Enter your Email.." onChange={(e) => SetNewEmail(e.target.value)} /></td>
                            <td><InputGroup  value ={NewWebsite} placeholder='Enter your Wbsite..' onChange={(e)=> SetNewWebsite(e.target.value)} /></td>
                            <td><Button style={{width: 130}} intent='success' onClick={addUser}>Add user</Button></td>
                          </tr>
                    </tfoot>
                  
            </table>
            <Toaster position="top-center" />
        </div>
        </>
    )


}

export default UsersManagementApp;