import data from "../data"
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, Outlet } from "react-router-dom"
import Spinner from "./Spinner";

import db from "../firebaseinit"
const Home = () => {


    useEffect(() => {

        getProducts();

    }, [])

    const navigate = useNavigate()

    const [cartProducts, setCartProducts] = useState([])

    const [loader, setLoader] = useState(false)


    const getProducts = async () => {
        setLoader(true)
        const temp = []

        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {

            temp.push(doc.data())
        });

        setCartProducts(temp);
        setLoader(false);
    }

    const addToCart = (product) => {

        if (!localStorage.getItem("user")) {
            navigate("/login")
        } else {

            if (cartProducts.length == 0) {
                product.qty = 1;
                setCartProducts([product])
                return;
            }

            const index = cartProducts.findIndex(c => c.id == product.id);

            if (index) {
                cartProducts[index].qty++;
                setCartProducts(cartProducts);
                return;
            }

            product.qty = 1;
            cartProducts.push(product)

            return;

        }

    }



    return (

        <>




            <div className="container mt-4">

                <div className="row">

                    <div className="col-md-4">

                        <div className="card">
                            <div className="form-group">
                                <input type="range" min="1000" max="50000" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                                <input type="checkbox" />
                            </div>
                        </div>

                    </div>

                    <div className="col-md-8">
                        <h3>Products : </h3>
                        <div className="row">

                            <Spinner loader={loader} />

                            {cartProducts.map((product) => (<>
                                <div className="col-md-4 mt-3 mb-3">
                                    <div className="card h-100"  >

                                        <img className="card-img-top" src={product.image} alt={product.name} />

                                        <div className="card-header">
                                            <h5>{product.name}</h5>
                                        </div>

                                        <div className="card-body">
                                            <p> ₹ {product.price}</p>
                                        </div>
                                        <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
                                    </div>

                                </div>


                            </>))}
                        </div>



                    </div>

                </div>



            </div>
            <Outlet />
        </>
    )

}

export default Home;