import { useFormik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import UseAppContext from '../AppContext';

const AddPortfolio = () => {

  const [selFile, setSelFile] = useState('');
  const { setportfolio } = UseAppContext();
  const portfolioForm = useFormik({
    initialValues: {
      fullname: '',
      bio: '',
      facebook: '',
      linkedin: '',
      email: '',
      skills: '',
      image: '',
      createdat: new Date()
    },
    onSubmit: async (values) => {
      values.image = selFile;
      console.table(values);
      const res = await fetch('http://localhost:5000/portfolio/add', {

        method: 'POST',
        //stringify is a static method convert javascript value to json string
        body: JSON.stringify(values),
        headers: {
          //content-type is a MIME type that indecate content being send or received is json data
          'Content-Type': 'application/json'
        }

      })

      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',

        })
        setportfolio(true);
        const data = await res.json()
        sessionStorage.setItem('user', JSON.stringify(data))

      } else if (res.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Try again',

        })
      }

    }
  });

  

  const uploadFile = async (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setSelFile(file.name);

    const fd = new FormData();
    fd.append('myfile', file);

    const res = await fetch('http://localhost:5000/util/uploadfile', {
      method: 'POST',
      body: fd
    });

    console.log(res.status);
  }

  return (
    <div className='class1'>
      <div className="col-md-4 d-flex mx-auto align-items-center vh-100 pt-5 ">
        <div className="card w-100 mt-5 shadow bg-light">
          <h3 className='mt-4 mx-3 heading' style={{ fontSize: '22px', fontWeight: 700 }} >Create Your Portfolio </h3>
          <div className="card-body">
            <form onSubmit={portfolioForm.handleSubmit}>
              <label htmlFor="">Full Name</label>
              <input type="text" className='form-control mb-2' id='full name' onChange={portfolioForm.handleChange} values={portfolioForm.values.fullname} />
              <label htmlFor="">Bio</label>
              <input type="text" className='form-control mb-2' id='bio' onChange={portfolioForm.handleChange} values={portfolioForm.values.bio} />
              <label htmlFor="">facebook</label>
              <input type="text" className='form-control mb-2' id='facebook' onChange={portfolioForm.handleChange} values={portfolioForm.values.facebook} />
              <label htmlFor="">linkedin</label>
              <input type="text" className='form-control mb-2' id='linkedin' onChange={portfolioForm.handleChange} values={portfolioForm.values.linkedin} />
              <label htmlFor="">email</label>
              <input type="email" className='form-control mb-2' id='email' onChange={portfolioForm.handleChange} values={portfolioForm.values.email} />

              <label htmlFor="">skills</label>
              <input type="text" className='form-control mb-2' id='skills' onChange={portfolioForm.handleChange} values={portfolioForm.values.skills} />
              {/* <label htmlFor="">Image</label>
             <input type="image"  className='form-control mb-2' id='image'  onChange={rentForm.handleChange} values={rentForm.values.image}/> */}
              <label htmlFor="">CreatedAt</label>
              <input type="date" className='form-control mb-2' id='createdat' onChange={portfolioForm.handleChange} values={portfolioForm.values.createdat} />
              <label htmlFor="">Upload Image</label>
              <input type="file" className="form-control mb-2" onChange={uploadFile} />
              <button type='submit' className='btn btn-primary w-100 my-3'> Submit Here</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPortfolio

