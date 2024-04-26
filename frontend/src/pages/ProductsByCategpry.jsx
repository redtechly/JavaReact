import { useQuery } from "react-query";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../services/ProductService";

const ProductsByCategpry = () => {
  const { id } = useParams();
  const { data: allProduct, isLoading } = useQuery(["List Product", id], () =>
    getProductByCategory(Number(id))
  );
  if (isLoading) return <h1>Loading</h1>;
  return (
    <div>
      <div className="container mt-3">
        <h2 className="text-center mb-3">List of Product</h2>
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

export default ProductsByCategpry;
