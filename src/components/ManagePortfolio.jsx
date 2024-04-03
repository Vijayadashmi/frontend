import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ManagePortfolio = () => {

  const [userList, setuserList] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/portfolio/getall');
    console.log(res.status);

    const data = await res.json();
    console.table(data);
    setuserList(data);
  };

  useEffect(() => {
    //on component open
    fetchUserData();

    // return () => {
    //before the component closes
    // alert('Do you want to save changes');
    // }
  }, []);

  const deleteUser = async (id) => {
    console.log(id);

    const res = await fetch('http://localhost:5000/portfolio/delete/' + id, { method: 'DELETE' });
    console.log(res.status);
    if (res.status === 200) {
      fetchUserData();
      toast.success('user Deleted Successfully');
    }

  }


  return (
    <div className="vh-100 bg-body-secondary class1">
      <div className="container py-5">
        <h1 className="text-center my-4">Manage Portfolio</h1>


        <table className="table table-dark">
          <thead>
            <tr>
              <th>S. no.</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Bio</th>
              <th>Facebook</th>
              <th>Linkedin</th>
              <th>Image</th>
              <th>Skills</th>
              <th>Created At</th>
              <th colSpan={2} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">

              {
                userList.map((user, index) => (
                  <motion.tr
                    layout
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.bio}</td>
                    <td>{user.facebook}</td>
                    <td>{user.linkedin}</td>
                    <td>{user.image}</td>
                    <td>{user.skills}</td>
                    <td>{user.createdat}</td>

                    <td>
                      <a target='_blank' href={'/viewportfolio/' + user._id} className="btn btn-primary">Edit</a>
                    </td>

                    <td>
                      <button className="btn btn-danger" onClick={() => { deleteUser(user._id) }}>Delete</button>
                    </td>


                  </motion.tr>
                ))
              }
            </AnimatePresence>
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ManagePortfolio;