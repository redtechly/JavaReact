import { useContext, useState } from "react";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [address, setAddress] = useState(""); // State to store address input

  // Calculate total quantity and total price of all items in the cart
  const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  const checkoutHandler = () => {
    // Navigate to the checkout page and pass the address as a query parameter
    navigate(`/checkout?address=${address}`);
  };

  return (
    <div className="container mt-2 mb-5">
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h3>Cart Items</h3>
              <hr />
              <div>
                {/* Display cart items (if any) */}
                {cartItems.length === 0 ? (
                  <p>Cart is empty.</p>
                ) : (
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <Row className="align-items-center">
                          <Col md={3}>
                            {/* Display item image */}
                            <img
                              src={`/images/${item.imagepathe}`}
                              alt={item.name}
                              width={100}
                              className="img-fluid rounded img-thumbnail"
                            />
                          </Col>
                          <Col md={9}>
                            {/* Display item details */}
                            {item.name} - Quantity: {item.quantity}
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3>Order Summary</h3>
              <hr />
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <p>Payment Method: Cash on delivery</p>
              <p>Address:</p>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Card.Body>
          </Card>
          <div className="d-grid mt-3">
            <Button
              type="button"
              variant="primary"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0 || address.trim() === ""}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
