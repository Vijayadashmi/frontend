import React from 'react'
import { useFormik } from "formik";
import Swal from 'sweetalert2';

import {motion} from 'framer-motion';




const Login = () => {

  

  // initialize formik

  const loginForm = useFormik({
    initialValues:{
      email: '',
      password: '',
      
    },
    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body : JSON.stringify(values),
        headers:{
          'Content-Type' : 'application/json'
        }

      });

      console.log(res.status);

      if(res.status === 200) {
        Swal.fire({
          icon : 'success',
          title : 'Login success',        
        })
        

        const data = await res.json();

        sessionStorage.setItem( 'user', JSON.stringify(data) );

      }else if(res.status === 400) {
        Swal.fire({
          icon : 'error',
          title : 'Login Failed',
          text : 'Invalid email or password'        
        })
    }
   }
  })




  return (
    <motion.div
    initial={{opacity:0, scale:0.2, x: '100%'}}
        animate={{opacity:1, scale:1, x: 0}}
        
     className="vh-100 bg-body-secondary class1">
    <div className="col-md-3 mx-auto pt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center my-5">Login Form</h3>

          <form onSubmit={loginForm.handleSubmit}>
            

            <label>Email Address</label>
            <input id="email" onChange={loginForm.handleChange} value={loginForm.values.email} type="text" className='form-control mb-4' />

            <label>Password</label>
            <input id="password" onChange={loginForm.handleChange} value={loginForm.values.password} type="password" className='form-control mb-4' />

            
            <button  type="submit" className="btn btn-dark my-4 w-100">Login</button>
          </form> 
        </div>
      </div>
    </div>
  </motion.div>
  )
}

export default Login;
    
      