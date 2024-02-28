import "react-toastify/dist/ReactToastify.css";
import db from "./firebaseinit"
import './App.css';
import Navbar from './components/Navbar';
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import Cart from './components/Cart';
import Orders from './components/Orders';
import Login from "./components/Login"
import Logout from "./components/Logout";
import {createBrowserRouter , RouterProvider , useNavigate} from "react-router-dom"

  

  const ProtectedComponent = ({children})=>{
    
    if(!localStorage.getItem("user")){
       return <Login />
    }else{
      return children;
    }
  }


function App() {
     

     const router = createBrowserRouter([
      {
       path : "/" , element : <Navbar /> , children : [
           {
             path : "/" , element : <Home />
           },

           {
            path : "login" , element : <Login />
           },
           {
            path : "sign-up" , element : <SignUp />
           },
            
           {
            path : "cart" , element : <ProtectedComponent>  <Cart /> </ProtectedComponent> 
           },
           {
            path : "orders" , element : <ProtectedComponent> <Orders /> </ProtectedComponent>
           },
           {
            path : "logout" , element : <Logout />
           }
        ]
      }
     ])
    
  return (
    <>
        
         <RouterProvider router={router} />
    </>
   
  );
}

export default App;
