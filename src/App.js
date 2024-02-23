import "react-toastify/dist/ReactToastify.css";
import db from "./firebaseinit"
import './App.css';
import Navbar from './components/Navbar';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import Cart from './components/Cart';
import Orders from './components/Orders';

import {createBrowserRouter , RouterProvider} from "react-router-dom"



function App() {
     

    const router = createBrowserRouter([
         
      {
        path : "/" , element: <Navbar /> , children : [

          {
                index : true , element : <Home />
          },
          {
            path : "login" , element : <Login />
          },

          {
            path : "sign-up" , element : <SignUp />
          },

          {
            path : "/home" , element : <Home /> , children : [
              {
                path : "cart" , element : <Cart />
              },
    
              {
                path : "orders" , element : <Orders />
              }
            ]
          },
         
        ]
      },

     
    ])
    
  return (
    <>
        
         <RouterProvider router={router} />
    </>
   
  );
}

export default App;
