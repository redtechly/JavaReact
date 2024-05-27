import { useState } from "react";
import { useQuery } from "react-query";
import { listProducts } from "../services/ProductService";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const ProductsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: allProducts, isLoading } = useQuery("List Product", () =>
    listProducts()
  );

  if (isLoading) return <h1>Loading</h1>;

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container mt-3">
        <h2 className="text-center mb-3">List of Product</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
              <ProductCard product={product}></ProductCard>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductsScreen;
