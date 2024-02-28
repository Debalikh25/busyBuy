import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { authContext } from "../authContext";
import { cartContext } from "../cartContext";
import { ToastContainer } from "./toastAlert";
import db from "../firebaseinit";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoggedIn(true);
    }
  }, [localStorage.getItem("user")]);

  const auth = getAuth();

  // Logic to add product inside cart. Passing this function as a context to children of this component.Product qty is set here.
  const addToCart = async (product) => {
    try {
   

      // finding cartId of user
      let cartId = undefined;
      const cartItemsRef = collection(db, "cart");
      const q = query(
        cartItemsRef,
        where("userEmail", "==", localStorage.getItem("user"))
      );
      const querySnapshot = await getDocs(q);

      //cart not created yet for the user(scenario 1)

      if (cartProducts.length == 0 && querySnapshot.empty) {
        cartProducts.push({
          //adding product locally first
          ...product,
          qty: 1,
        });

        await addDoc(collection(db, "cart"), {
          //adding the doc to the db also and creating cart
          userEmail: localStorage.getItem("user"),
          items: [
            {
              ...product,
              qty: 1,
            },
          ],
        });

        return;
      }

      //cart exist both in local and database but is empty(scenario 2)
      querySnapshot.forEach((d) => {
        cartId = d.id;
      });

      const productRef = doc(db, "cart", cartId);
      if (cartProducts.length == 0 && cartId != undefined) {
        cartProducts.push({
          ...product,
          qty: 1,
        });
        setCartProducts(cartProducts);
        await updateDoc(productRef, {
          items: cartProducts,
        });
        return;
      }

      //cart contain the same product both in local and database(scenario 3)
      const index = cartProducts.findIndex((p) => p.id == product.id);
      if (index != -1) {
        cartProducts[index].qty++;
        setCartProducts(cartProducts);
        await updateDoc(productRef, {
          items: cartProducts,
        });
        return;
      }

      cartProducts.push({
        ...product,
        qty: 1,
      });

      await updateDoc(productRef, {
        items: cartProducts,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider value={{ loggedIn, setLoggedIn }}>
      <cartContext.Provider
        value={{ cartProducts, setCartProducts, addToCart }}
      >
        <nav className="navbar navbar-expand-sm  navbar-dark nav-custom">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Buy Busy
            </NavLink>

            <ul className="navbar-nav ml-auto">
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      Cart
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/orders" className="nav-link">
                      Orders
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/sign-up" className="nav-link">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <ToastContainer />
        <Outlet />
      </cartContext.Provider>
    </authContext.Provider>
  );
};

export default Navbar;
