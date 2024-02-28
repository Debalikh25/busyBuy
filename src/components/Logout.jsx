import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { successMessage } from "./toastAlert";
import { failureMessage } from "./toastAlert";
import { authContext } from "../authContext";

const Logout = () => {
  const { setLoggedIn } = useContext(authContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const logout = (flag) => {
    if (flag) {
      signOut(auth).then(() => {
        localStorage.removeItem("user");

        successMessage("Logged out !!");

        setLoggedIn(false);
        navigate("/");
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Sure you want to logout ? All Changes will be lost</h1>

      <span>
        <button onClick={() => logout(true)} className="btn btn-danger">
          Yes
        </button>
      </span>

      <span>
        <button onClick={() => logout(false)} className="btn btn-success ml-4">
          No
        </button>
      </span>
    </div>
  );
};

export default Logout;
