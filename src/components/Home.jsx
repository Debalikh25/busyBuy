import data from "../data"

const Home = () => {
    return (
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
                        {data.map((product) => (<>
                            <div className="col-md-4 mt-3 mb-3">
                                <div className="card">

                                    <div className="card-header">
                                        <h5>{product.name}</h5>
                                    </div>

                                    <div className="card-body">
                                        <p> ₹ {product.price}</p>
                                    </div>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>

                            </div>


                        </>))}
                    </div>



                </div>

            </div>

        </div>

    )

}

export default Home;