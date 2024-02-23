import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { successMessage, failureMessage, ToastContainer } from "./toastAlert";
const SignUp = () => {


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const auth = getAuth();
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            successMessage("Registration Successful !")
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
        catch (error) {
            failureMessage(`Something went wrong: ${error.message}`)
        }
    }

    return (

        <div className="container">
            <ToastContainer />


            <form className="form" onSubmit={(e) => register(e)}>
                <h3 className="mb-3" >Register</h3>
                <div className="form-group">
                    <input type="email" name="email" className="form-control" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" required />
                </div>

                <div className="form-group">
                    <input type="password" name="password" className="form-control" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Enter Password" required />
                </div>





                <input type="submit" className="btn btn-primary" value="Sign Up" />

            </form>

        </div>


    )

}

export default SignUp;