import { useState  } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {ToastContainer , toast} from "react-toastify"
import PacmanLoader from "react-spinners/PacmanLoader";
const Login = () => {


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const auth = getAuth();

    const login = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, data.email, data.password)
             toast('Login Success' , {
                position : "top-right",
                autoClose : 5000,
                theme :"light",
                transition : "bounce" 
             })
            setTimeout(()=>{
                navigate("/")
            } , 5000)
        }
        catch (error) {
            toast('Wrong Credentials' , {
                position : "top-right",
                autoClose : 5000
             })
            setLoading(false)
        }
}

    return (

        <>
            <form onSubmit={(e) => login(e)}>

                <input type="email" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" required />

                <input type="password" name="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Enter Password" required />

                <input type="submit" value="Login" />

            </form>

            <PacmanLoader
                color="red"
                loading={loading}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition="bounce"  />


        </>

    )

}

export default Login;