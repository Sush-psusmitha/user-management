import { useEffect, useState } from "react";
import {
  Button,
  EditableText,
  InputGroup
} from "@blueprintjs/core";
import { Toaster, toast } from 'react-hot-toast';
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    async function userData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Can't fetch the data!");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      }
    }
    userData();
  }, []);

  function addUsers() {
    const name = newUser.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email, website }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers([...users, data]);

         toast.success("User added successfully!");

          setNewUser("");
          setNewEmail("");
          setNewWebsite("");
        });
    } else {
      toast.error("Please fill all the fields!");
    }
  }

  function onChangeHandle(id,key,value){
    setUsers((users)=>{
           users.map(user => {
                user.id === id ? {...user, [key]:value} : user;
           } )
    })
  }

  function addUsers(id){
     const user = users.find((user)=> user.id === id); 

     fetch(`https://jsonplaceholder.typicode.com/users/10`,{ //must give the id, but we are using fake API in that only 10 data we can modifiy upcoming datas
        
      method: 'PUT', 
      body: JSON.stringify(user), 
      headers: {
        "Content-Type" : "application/json; charset-UTF-8",
      }
         
     })
     .then((res)=>res.json())
     .then((data)=>{
        console.log(data);
        toast.success("User Details Updated!")
     })

  }

  return (
    <div className="App">
      <table className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Website</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td><EditableText onChange={value => onChangeHandle(user.id,  "email", value)} value={user.email} /></td>
              <td><EditableText onChange={value => onChangeHandle(user.id, "website", value)} value={user.website} /></td>
              <td>
                <Button intent="primary" style={{ marginRight: 6 }} onClick={() => addUsers(user.id) }  >Update</Button>
                <Button intent="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Enter your name..."
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your email..."
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter your website..."
              />
            </td>
            <td>
              <Button intent="success" onClick={addUsers}>
                Add User
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>

    <Toaster position="top-center" />
    </div>
  );
}

export default App;
