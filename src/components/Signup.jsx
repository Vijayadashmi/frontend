import { useFormik } from "formik";
import React from 'react';

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';


 
  

const Signup = () => {

  const navigate = useNavigate();

  // initialize formik

  const signupForm = useFormik({
    initialValues:{
      name: '',
      email: '',
      password: '',
      confirm: '',

    },
    onSubmit: async (values) => {
      console.table(values);

      const res = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
           
        }
      });

      console.log(res.status);

      if(res.status ===200){
        Swal.fire({
          icon: 'success',
          title: 'Signup Success',
          text:'Now Login to Continue'
        })
        navigate('/login');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text:'Please Try Again'
        })
      }

    },
   
  });

  const uploadFile = async (e) => {
    if(!e.target.files) return;

    const file = e.target.files[0];

    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);
  }

  return (
    
      <motion.div 
        initial={{opacity:0, scale:0.2, x: '100%'}}
        animate={{opacity:1, scale:1, x: 0}}
        transition={{duration: 0.5, type: 'spring', damping: 15, stiffness: 100}}
      className="vh-100 bg-body-secondary class1">
      <div className="col-md-3 mx-auto pt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center my-5">Create Account</h3>

            <form onSubmit={signupForm.handleSubmit}>
              <label>Name</label>

              <span style={{color:'red', fontSize: 10, marginLeft:10}}>{signupForm.errors.name}</span>
              <input id="name" onChange={signupForm.handleChange} value={signupForm.values.name} type="text" className="form-control mb-4" />

              <label>Email</label>
              <span style={{color:'red', fontSize: 10, marginLeft:10}}>{signupForm.errors.email}</span>
              <input id="email" onChange={signupForm.handleChange} value={signupForm.values.email} type="text" className="form-control mb-4" />

              <label>Password</label>
              <span style={{color:'red', fontSize: 10, marginLeft:10}}>{signupForm.errors.password}</span>
              <input id="password" onChange={signupForm.handleChange} value={signupForm.values.password} type="password" className="form-control mb-4" />

              <label>Confirm Password</label>
              <span style={{color:'red', fontSize: 10, marginLeft:10}}>{signupForm.errors.confirm}</span>
              <input id="confirm" onChange={signupForm.handleChange} value={signupForm.values.confirm} type="password" className="form-control mb-4" />

            

              <button  type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

      

export default Signup;