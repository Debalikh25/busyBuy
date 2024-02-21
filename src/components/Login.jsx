import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const auth = getAuth();

    const login = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        }
        catch (error) {
            console.log('Some error occured while login !')
        }

    }

    return (
        <form onSubmit={(e) => login(e)}>

            <input type="email" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" required />

            <input type="password" name="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Enter Password" required />

            <input type="submit" value="Login" />

        </form>
    )

}

export default Login;