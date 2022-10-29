import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context'; 
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername]= useState('')
  const [email,setEmail]= useState('')
  const [phone,setPhone]= useState('')
  const [password,setPassword]= useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(username.length<=4 || password.length<=6 || phone.length!=10 || email==='') {
      alert("Require all details")
    }else{
      firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(()=>{
            history.push("/login")
          })
      
        })
      }).catch((error)=> {
        alert(error.message);
      })
    }
   

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{
              if(e.target.value.length<=4){
console.log('hiiiiiiiiiiiiiiiiiiii');

              }
              setUsername(e.target.value)
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
