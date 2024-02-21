import React from "react";
import { NavLink } from "react-router-dom"

const Navbar = () => {

  return (
    <>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <NavLink className="navbar-brand" to="/">Buy Busy</NavLink>

        <ul className="navbar-nav ml-auto">



          <li className="nav-item">

            <NavLink to="/login" className="nav-link">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sign-up" className="nav-link">Sign Up</NavLink>
          </li>

        </ul>
      </nav>

    </>
  )

}

export default Navbar;