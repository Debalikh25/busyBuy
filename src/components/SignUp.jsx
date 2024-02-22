import { useState } from "react"

import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {


    const [data, setData] = useState({
        email: "",
        password: ""
    })
 
      const auth = getAuth();

    const register = async (e) => {
        e.preventDefault()
         try{
             await createUserWithEmailAndPassword(auth , data.email , data.password)
             console.log('User Signed Up Successfully')
         }
         catch(error){
            console.log(error.message)
         }
    }

    return (
        <form onSubmit={(e) => register(e)}>

            <input type="email" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" required />

            <input type="password" name="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Enter Password" required />

            <input type="submit" value="Sign Up" />

        </form>
    )

}

export default SignUp;