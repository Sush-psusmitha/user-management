import { useEffect, useState } from "react";
import {Button,EditableText} from '@blueprintjs/core';
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    async function userData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("Can't Fetch the data!");
        }
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }
    userData();
  }, []);

  return (
    <div className="App">
      <table className="bp4-html-table modifier">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td><EditableText value={user.email}/></td>
                 <td><EditableText value={user.website}/></td>
                 <td>Edit Delete</td>   
                 <tr>
                  <Button intent="primary">Update</Button>
                  <Button intent='danger'>Delete</Button>
                  </tr>           
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
