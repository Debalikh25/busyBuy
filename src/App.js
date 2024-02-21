import Navbar from './components/Navbar';
import './App.css';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"

import {createBrowserRouter , RouterProvider} from "react-router-dom"



function App() {

   const routes = createBrowserRouter([
         {
          path : "/" , element :< Home />
         },

         {
            path : "login" , element : <Login />
         },

         {
          path : "sign-up" , element : <SignUp />
         }
      
   ])
  return (
    <>
         <Navbar />
         <RouterProvider router={routes} />
    </>
   
  );
}

export default App;
