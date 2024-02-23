import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { successMessage, failureMessage, ToastContainer } from "./toastAlert";
import PacmanLoader from "react-spinners/PacmanLoader";
const Login = () => {


    const [data, setData] = useState({
        email: "",
        password: ""
    })



    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const auth = getAuth();  



    const login = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const loginUser = await signInWithEmailAndPassword(auth, data.email, data.password)
            localStorage.setItem("user", loginUser.user)
            setLoading(false)

            successMessage("Login Success !!")

            setTimeout(() => {
                navigate("/")
            }, 5000)
        }
        catch (error) {
          failureMessage("Wrong Credentials")
            setLoading(true)
        }
    }

    return (

        <div className="container">

            <ToastContainer />

            

            <form className="form" onSubmit={(e) => login(e)}>
            <h3 className="mb-3">Login</h3>
                <div className="form-group">

                    <input type="email" name="email" className="form-control" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" required />

                </div>

                <div className="form-group">

                    <input type="password" name="password" className="form-control" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Enter Password" required />

                </div>

                <input type="submit" className="btn btn-success" value="Login" />





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
                transition="bounce" />



        </div>







    )

}

export default Login;