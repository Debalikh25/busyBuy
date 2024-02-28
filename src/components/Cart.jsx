import { useContext, useEffect, useState } from "react";
import { cartContext } from "../cartContext";
import { failureMessage, successMessage } from "./toastAlert";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../firebaseinit";
const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItemsForUser();
  }, []);

  useEffect(() => {
    if (cartProducts.length == 0) {
      return;
    }

    calculateTotal();
  }, [total, cartProducts]);

  const calculateTotal = () => {
    let total = 0;
    cartProducts.forEach((p) => {
      let sum = p.price * p.qty;
      total += sum;
    });

    setTotal(total);
  };

  //get all cart items from thedatabase for a particular user
  const getCartItemsForUser = async () => {
    try {
      setLoading(true);
      if (localStorage.getItem("user")) {
        //write query here to get user's cart items
        const cartItemsRef = collection(db, "cart");
        const q = query(
          cartItemsRef,
          where("userEmail", "==", localStorage.getItem("user"))
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size == 0) {
          setCartProducts([]);
        } else {
          querySnapshot.forEach((d) => {
            setCartProducts(d.data().items);
          });
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const orderItems = async () => {
    try {
      const now = new Date();
      const ref = await addDoc(collection(db, "orders"), {
        //adding the doc to the db also and creating cart
        date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
        total,
        products: cartProducts,
        userEmail: localStorage.getItem("user"),
      });

      successMessage(`Order Generated : ${ref.id}`);
      navigate("/");
      const cartItemsRef = collection(db, "cart");
      const q = query(
        cartItemsRef,
        where("userEmail", "==", localStorage.getItem("user"))
      );
      const querySnapshot = await getDocs(q);
      let id = "";
      querySnapshot.forEach((d) => {
        id = d.id;
      });

      const productRef = doc(db, "cart", id);

      setCartProducts([]);
      await updateDoc(productRef, {
        items: [],
      });

      setTotal(0);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductRefFromDB = async () => {
    try {
      const cartItemsRef = collection(db, "cart");
      const q = query(
        cartItemsRef,
        where("userEmail", "==", localStorage.getItem("user"))
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return -1;
      }
      let id = "";
      querySnapshot.forEach((d) => {
        id = d.id;
      });

      const productRef = doc(db, "cart", id);
      return productRef;
    } catch (error) {
      console.log(error.message);
    }
  };
  //increments the quantity of product
  const incrementQty = async (product, index) => {
    try {
      cartProducts.forEach((p) => {
        if (p.id == product.id) {
          p.qty++;
        }
      });

      setCartProducts(cartProducts);
      calculateTotal();

      const productRef = await getProductRefFromDB();
      await updateDoc(productRef, {
        items: cartProducts,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //decrements the quantity of product or removes it if quantity is 1
  const decrementQty = async (product, index) => {
    try {
      if (product.qty == 1) {
        removeProduct(product);
        return;
      }

      cartProducts[index].qty--;
      setCartProducts(cartProducts);

      const productRef = await getProductRefFromDB();
      calculateTotal();
      setCartProducts(cartProducts);

      await updateDoc(productRef, {
        items: cartProducts,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //Removes a product from cart
  const removeProduct = async (product) => {
    try {
      const productRef = await getProductRefFromDB();
      const filtered = cartProducts.filter((p) => product.id !== p.id);
      setCartProducts(filtered);
      await updateDoc(productRef, {
        items: filtered,
      });

      setTotal(total - product.price * product.qty);
      successMessage("Product removed from cart");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container mt-2">
        <Spinner loader={loading} />

        {loading == false ? (
          <div className="col-md-3">
            {total > 0 && cartProducts.length != 0 ? (
              <>
                <h3>Total :₹ {total}</h3>
                <button onClick={orderItems} className="btn btn-info">
                  Order
                </button>
              </>
            ) : (
              <h4 className="mt-4">Cart is empty</h4>
            )}
          </div>
        ) : undefined}

        <div className="col-md-9">
          {cartProducts.length > 0 ? (
            <div className="container">
              {cartProducts.map((p, index) => {
                return (
                  <div key={index} className="row cart-item">
                    <div className="col-md-3">
                      <p>{p.name}</p>
                    </div>

                    <div className="col-md-2">
                      <p>
                        <strong>X {p.qty}</strong>
                      </p>
                    </div>

                    <div className="col-md-2">
                      <p>₹ {p.price}</p>
                    </div>

                    <div className="col-md-2">
                      <span>
                        <button
                          onClick={() => incrementQty(p, index)}
                          className="btn btn-success"
                        >
                          +
                        </button>
                        <button
                          onClick={() => decrementQty(p, index)}
                          className="btn btn-danger ml-2"
                        >
                          -
                        </button>
                      </span>
                    </div>

                    <div className="col-md-3">
                      <span>
                        <button
                          onClick={() => removeProduct(p)}
                          className="btn btn-warning"
                        >
                          Remove
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h2></h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
