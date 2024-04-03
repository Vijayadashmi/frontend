import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      Navbar
      </a>
    <button class="navbar-toggler"
     type="button"
      data-bs-toggle="collapse"
       data-bs-target="#navbarSupportedContent" 
       aria-controls="navbarSupportedContent" 
       aria-expanded="false"
        aria-label="Toggle navigation"
        >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link"  to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login 
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </li>  
        <li className="nav-item">
          <NavLink className="nav-link" to="/addportfolio">
            Add Portfolio
          </NavLink>
        </li> 
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/manageportfolio">
           User Portfolio
          </NavLink>
        </li>    
               
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar