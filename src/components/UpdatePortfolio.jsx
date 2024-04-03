import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const UpdatePortfolio = () => {
  const { id } = useParams()

  const [portfolioData, setPortfolioData] = useState(null);
  const [selFile, setSelFile] = useState('');

  const navigate = useNavigate();

  const fetchportfolioData = async () => {
    const res = await fetch('http://localhost:5000/portfolio/getbyid/' + id)
    const data = await res.json()
    console.log(data);
    setPortfolioData(data);
  }
  useEffect(() => {
    fetchportfolioData()
  }, [])

  const submitForm = async (values) => {
    values.image = selFile;
    console.table(values);
    const res = await fetch('http://localhost:5000/portfolio/update/' + portfolioData._id, {

      method: 'PUT',
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
        title: 'Updated Successfully',
        text: 'Redirecting to Manage Portfolio',
      })
      navigate('/manage');

    } else if (res.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Try again',

      })
    }

  }

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
    <div>
      <div className="col-md-6 mx-auto pt-5">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center my-5">Update Portfolio Data</h3>
            {portfolioData !== null ? (
              <Formik initialValues={portfolioData} onSubmit={submitForm}>
                {(portfolioForm) => (
                  <form onSubmit={portfolioForm.handleSubmit}>
                    <label htmlFor="">Full Name</label>
                    <input type="text" className='form-control mb-2' id='name' onChange={portfolioForm.handleChange} value={portfolioForm.values.fullname} />
                    <label htmlFor="">Bio</label>
                    <input type="text" className='form-control mb-2' id='bio' onChange={portfolioForm.handleChange} value={portfolioForm.values.bio} />
                    <label htmlFor="">Facebook</label>
                    <input type="text" className='form-control mb-2' id='facebook' onChange={portfolioForm.handleChange} value={portfolioForm.values.facebook} />
                    <label htmlFor="">Linkedin</label>
                    <input type="text" className='form-control mb-2' id='linkedin' onChange={portfolioForm.handleChange} value={portfolioForm.values.linkedin} />
                    <label htmlFor="">Email</label>
                    <input type="email" className='form-control mb-2' id='email' onChange={portfolioForm.handleChange} value={portfolioForm.values.email} />
                    <label htmlFor="">Skills</label>
                    <input type="text" className='form-control mb-2' id='skills' onChange={portfolioForm.handleChange} value={portfolioForm.values.skills} />
                   
                    {/* <label htmlFor="">Image</label>
                 <input type="image"  className='form-control mb-2' id='image'  onChange={rentForm.handleChange} values={rentForm.values.image}/> */}
                    <label htmlFor="">Upload Image</label>
                    <input type="file" className="form-control mb-2" onChange={uploadFile} />
                    <button type='submit' className='btn btn-primary w-100 my-3'> Submit Here</button>
                  </form>
                )}
              </Formik>
            ) : (
              <h1 className="text-center my-5">Loading ... </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
   
export default UpdatePortfolio