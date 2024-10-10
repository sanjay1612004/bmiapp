
import { useEffect, useState } from 'react';
import './App.css';
import { Button,EditableText,InputGroup,Toaster } from '@blueprintjs/core';

const AppToater=Toaster.create({
  position:"top"
})
function App() {
  const [users,setUsers]=useState([]);
  const[newname,setNewName]=useState('');
  const[newEmail,setNewEmail]=useState('');
  const[newWebsite,setNewWebsite]=useState('');
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then((json)=>setUsers(json))
  },[])
  console.log(users);
  function addUser(){
    const name=newname.trim();
    const email=newEmail.trim();
    const website=newWebsite.trim();
    if (name && email && website){
      fetch('https://jsonplaceholder.typicode.com/users',
        {
          method:"POST",
          body:JSON.stringify({
            name,email,website
          }),
          headers:{
            "Content-Type":"application/json;charset=UTF-8"
          }
        }
      ).then((response)=>response.json())
      .then((data)=>{
        setUsers([...users,data]);
        AppToater.show({
          message:"user add successfully",
          intent:'success',
          timeout:3000
        })
        setNewName("");
        setNewEmail("");
        setNewWebsite("");
      })
    } 

  }
  function onchangehandle(id,key,value){
    setUsers((users)=>{
      return users.map(user=>{
        return user.id === id?{...user,[key]:value}:user;
      })
    })
  }
  function updateuser(id){
    const user=users.find((user)=>user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"PUT",
        body:JSON.stringify({
          user
        }),
        headers:{
          "Content-Type":"application/json;charset=UTF-8"
        }
      }
    ).then((response)=>response.json())
    .then((data)=>{
      
      AppToater.show({
        message:"user updated successfully",
        intent:'success',
        timeout:3000
      })
      
    })
  }
  function Deleteuser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"DELETE",
        
      }).then((response)=>response.json())
    .then((data)=>{
      setUsers((users)=>{
        return users.filter((user)=>user.id !== id)
      })
      AppToater.show({
        message:"user deleted successfully",
        intent:'success',
        timeout:3000
      })
      
    })
  }
  return (
    <div className="App">
      <table>
        <thead className='bp4-html-table modifier'>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {users.map(user=>
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td><EditableText value={user.email} onChange={value=>onchangehandle(user.id,'email',value)}/></td>
            <td><EditableText value={user.website} onChange={value=>onchangehandle(user.id,'website',value)}/></td>
            <td><Button intent='primary' onClick={()=>updateuser(user.id)}>Update</Button>
                <Button intent='danger' onClick={()=>Deleteuser(user.id)}>Delete</Button>
            </td>
          </tr>
          )}
          
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup 
            value={newname}
            onChange={(e)=>setNewName(e.target.value)}
            placeholder='Enter Name'/></td>
            <td><InputGroup 
            value={newEmail}
            onChange={(e)=>setNewEmail(e.target.value)}
            placeholder='Enter Email'/></td>
            <td><InputGroup 
            value={newWebsite}
            onChange={(e)=>setNewWebsite(e.target.value)}
            placeholder='Enter website'/></td>
            <td>
              <Button intent='success' onClick={addUser}>Add User</Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
