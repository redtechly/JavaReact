import React, { useState } from 'react';
import "../../css/bootstrap.min.css";
//import "../../css/bootstrap.min.css.map";
import "../../css/all.min.css";

// const CartPage = ({ productsInCart }) => {
//    //const [cartItems, setCartItems] = useState(productsInCart);

//     const incrementCart = (productId) => {
        
//     };

//     const decrementCart = (productId) => {
        
//     };

//     return (
//         <div>
//             {cartItems.length === 0 ? (
//                 <h2 className="text-primary">The cart is empty.</h2>
//             ) : (
//                 <ul>
//                     <h3 className="text-primary">Cart Items</h3>
//                     {cartItems.map((item) => (
//                         <div key={item.cart_id} className="container mt-4">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <div className="row">
//                                         <div className="col-2">
//                                             <img
//                                                 src={item.product.image}
//                                                 width="200"
//                                                 height="200"
//                                                 className="img-fluid"
//                                                 alt="Product Image"
//                                             />
//                                         </div>
//                                         <div className="col-4">
//                                             <h5 className="card-title">Product Name : {item.product.name}</h5>
//                                             <p className="card-text">Product Description : {item.product.description}</p>
//                                         </div>
//                                         <div className="col-2">
//                                             <p className="card-text">Total_Price: {item.total_price} EGP</p>
//                                         </div>
//                                         <div className="col-2">
//                                             <div className="input-group">
//                                                 <button type="button" className="btn btn-danger" onClick={() => decrementCart(item.product.id)}>
//                                                     <i className="fa fa-minus"></i>
//                                                 </button>
//                                                 <span className="form-control text-center" id={`amount-${item.product.id}`}>
//                                                     {item.amount}
//                                                 </span>
//                                                 <button type="button" className="btn btn-success" onClick={() => incrementCart(item.product.id)}>
//                                                     <i className="fa fa-plus"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div className="col-2">
//                                             <a href={`/deletecart/${item.cart_id}`}><button type="button" className="btn btn-danger"><i className="fa fa-trash"></i> Delete</button></a>
//                                         </div>
//                                         <div className="col-2">
//                                             <a href={`/order/${item.product.id}/${item.cart_id}`}><button type="button" className="btn btn-primary">Order</button></a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </ul>
//             )}
//             <a href="/orderall"><button type="button" className="btn btn-primary">Order All</button></a>
//         </div>
//     );
// };

// export default CartPage;

const CartPage = () => {
    return (
        <div>
            <ul>
                <h3 className="text-primary">Cart Items</h3>
                <div className="container mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-2">
                                    <img
                                        src="path_to_image"
                                        width="200"
                                        height="200"
                                        className="img-fluid"
                                        alt="Product Image"
                                    />
                                </div>
                                <div className="col-4">
                                    <h5 className="card-title">Product Name : Sample Product</h5>
                                    <p className="card-text">Product Description : Sample Description</p>
                                </div>
                                <div className="col-2">
                                    <p className="card-text">Total_Price: $10</p>
                                </div>
                                <div className="col-2">
                                    <div className="input-group">
                                        <button type="button" className="btn btn-danger">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        <span className="form-control text-center">
                                            1
                                        </span>
                                        <button type="button" className="btn btn-success">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <a href="/deletecart/1"><button type="button" className="btn btn-danger"><i className="fa fa-trash"></i> Delete</button></a>
                                </div>
                                <div className="col-2">
                                    <a href="/order/1/1"><button type="button" className="btn btn-primary">Order</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
            {/* <a href="/orderall"><button type="button" className="btn btn-primary">Order All</button></a> */}
        </div>
    );
};

export default CartPage;
