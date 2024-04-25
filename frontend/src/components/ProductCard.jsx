import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { product } = props;
  const addToCartHandler = (product) => {
    console.log("Add to cart: ", product);
    // props.history.push(`/cart/${product.id}?qty=${1}`);
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price} EGP</Card.Text>
        <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
