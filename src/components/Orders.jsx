import { useEffect, useState } from "react";
import { getDocs, collection , query , where } from "firebase/firestore";
import Spinner from "./Spinner";
import db from "../firebaseinit";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
        setLoading(true)
      const orderedItemsRef = collection(db, "orders");
      const q = query(
       orderedItemsRef,
        where("userEmail", "==", localStorage.getItem("user"))
      );
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        setOrders([]);
        setLoading(false);
        return ;
      }
       const temp = []
      querySnapshot.forEach((doc) => {
        temp.push({
          orderId: doc.id,
          ...doc.data(),
        });
      });
      setOrders(temp);
      setLoading(false);
    } catch (err) {}
  };

  return (
    <div className="container">
        
         <Spinner loader={loading} />
         
      {orders.length == 0 ? (
        <h3 className="mt-4" >No Orders Found</h3>
      ) : (
        <div className="orders">
              
          {orders.map((order) => {
            
            return (
              <div className="single-order" key={order.orderId}>
                  <div className="order">
                      <h5>Order Id : {order.orderId}</h5>
                      <h5>Ordered on: {order.date}</h5>
                    </div>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    </tr>
                   
                   
                  </thead>

                  <tbody>
                    {order.products.map((o , index) => (
                      <tr key={index}>
                        <td>{o.name}</td>
                        <td>₹ {o.price}</td>
                        <td>{o.qty}</td>
                        <td>₹ {o.qty * o.price}</td>
                       
                      </tr>
                      
                    ))}
                  </tbody>
                    
                </table>
                <div className="order-total-price">
                    <h5>Total Price :₹ {order.total}</h5>
                    </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
