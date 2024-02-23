import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { authContext } from "../authContext";
import { successMessage, failureMessage, ToastContainer } from "./toastAlert";



const Navbar = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true)
    }
  }, [localStorage.getItem("user")])

  const auth = getAuth();


  const logout = () => {


    signOut(auth).then(() => {

      localStorage.removeItem("user")
      successMessage("logout Success")

      setLoggedIn(false)



    }).catch((error) => {
      // An error happened.
      failureMessage(`Something went wrong : ${error.message}`)
    });


  }

  return (
    
      <authContext.Provider value={{loggedIn, setLoggedIn}}>

        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

          <NavLink className="navbar-brand" to="/">Buy Busy</NavLink>

          <ul className="navbar-nav ml-auto">

            {loggedIn ? (<>

              <li className="nav-item">

                <NavLink to="/home" className="nav-link">Home</NavLink>
              </li>

              <li className="nav-item">

                <NavLink to="/home/cart" className="nav-link">Cart</NavLink>
              </li>

              <li className="nav-item">

                <NavLink to="/home/orders" className="nav-link">Orders</NavLink>
              </li>

              <li className="nav-item">
                <NavLink onClick={logout} className="nav-link">Logout</NavLink>
              </li>

            </>) : (<>

              <li className="nav-item">

                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sign-up" className="nav-link">Sign Up</NavLink>
              </li>

            </>)}





          </ul>
        </nav>
        <ToastContainer />
        <Outlet />


      </authContext.Provider>

  
  )

}

export default Navbar;