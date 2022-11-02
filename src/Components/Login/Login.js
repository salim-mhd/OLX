import React, { useState,useContext, useEffect } from 'react';
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const {firebase} = useContext(FirebaseContext)
const history = useHistory()
const [formErrors,setFormErrors]=useState({});
const [isSubmit,setIsSubmit]= useState(false);
const errors = {};

useEffect(()=>{
  if(Object.keys(formErrors).length ===0 && isSubmit){
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      Swal.fire({
        title: 'Something went wrong UserID!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    })
  }
},[formErrors]);

const validate=(email,password)=>{
    
    if(!email){
      errors.email="email is required"
    }
    if(!password){
      errors.password="password is required"
    }else if(password.length<4){
      errors.password="Password must be more than 4 characters"
    }else if(password.length>10){
      errors.password="Password should not exceed 10 characters"
    }
    return errors
  }


const handleLogin = (e)=>{
  e.preventDefault()
  setFormErrors(validate(email,password));
  setIsSubmit(true);
}
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=> setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <p style={{color:'red'}}>{formErrors.email}</p>
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=> setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <p style={{color:'red'}}>{formErrors.password}</p>
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
          history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
