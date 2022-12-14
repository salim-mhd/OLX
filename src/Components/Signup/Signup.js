
/* ------------------------------- signup page ------------------------------ */

import React, {useState,useContext,useEffect} from 'react';

import Swal from 'sweetalert2';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [phone, setPhone]=useState('');
  const [password, setPassword]=useState('');
  const {firebase}=useContext(FirebaseContext)

  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]= useState(false);
  const errors = {};

useEffect(()=>{
  if(Object.keys(formErrors).length ===0 && isSubmit){
firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  result.user.updateProfile({displayName:username}).then(()=>{
    firebase.firestore().collection('users').add({
      id:result.user.uid,
      username:username,
      phone:phone
    }).then(()=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Account Added successfully'
      })
    }).then(()=>{
      history.push("/login")
    })
  })
}).catch((error)=> {
  Swal.fire({
    icon: 'error',
    title: 'Something went wrong!',
    text: error.message, 
  })
})
  }
},[formErrors]);
  const validate=(username,email,phone,password)=>{
    
  const regexUsername = /^[A-Za-z][A-Za-z0-9_ ]{4,12}$/i; 
    const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!username){
      errors.username= 'username is required';
      }else if(!regexUsername.test(username)){
        errors.username="Username is not valid"
    }
    if(!email){
      errors.email="email is required"

    }else if(!regexMail.test(email)){
      errors.email="Not a valid email format"
    }
    if(!phone){
      errors.phone="phone number is required"
    }else if(phone.length!==10){
      errors.phone="Phone number must be 10 digit"
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

  const handleSubmit=(e)=>{
    e.preventDefault()
    setFormErrors(validate(username,email,phone,password));
    setIsSubmit(true);
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='cat'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder='username'
            defaultValue="John"
          />
          <p style={{color:"red"}}>{formErrors.username}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            // onChange={handleChange}
            id="fname"
            name="email"
            placeholder='email'
            defaultValue="John"
          />
          <p style={{color:"red"}}>{formErrors.email}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder='phone'
            defaultValue="Doe"
          />
          <p style={{color:"red"}}>{formErrors.phone}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder='password'
            defaultValue="Doe"
          />
          <p style={{color:"red"}}>{formErrors.password}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='/login'>Login</a>
        
      </div>
    </div>
  );
}
