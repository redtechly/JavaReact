import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { deleteProduct, listProducts } from "../services/ProductService";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductsComponent = () => {
  const { data: allProduct, isLoading } = useQuery("List Product", () =>
    listProducts()
  );

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div>
      <div className="container ">
        <h2 className="text-center">List of Product</h2>
        <Row>
          {allProduct.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductsComponent;
