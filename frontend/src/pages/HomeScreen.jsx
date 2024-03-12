import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Example categories data
const categories = [
  {
    id: 1,
    imageSrc: "images/BabyCare.png",
    altText: "Baby Care",
    link: "baby_care",
  },
  {
    id: 2,
    imageSrc: "images/FACE-CARE_1.jpg",
    altText: "Skin Care",
    link: "skin_care",
  },
  {
    id: 3,
    imageSrc: "images/Medications.png",
    altText: "Medications",
    link: "medications",
  },
  {
    id: 4,
    imageSrc: "images/Vitamins-and-Minerals_1.png",
    altText: "Vitamins",
    link: "vitamins",
  },
  // Add more categories as needed
];

const MainPage = () => {
  return (
    <>
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="images/baby.webp" alt="Baby" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/back.webp"
            alt="Back to School"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/cosmetics.webp"
            alt="Cosmetics"
          />
        </Carousel.Item>
      </Carousel>

      {/* Our Work Section */}
      <Container className="text-center my-5">
        <Image className="mb-4" src="images/saydlya.png" alt="" fluid />
        <h2>We have all you need</h2>
        <p className="text-black-50 text-uppercase">high quality low price</p>

        <Row>
          {categories.map((category) => (
            <Col sm={6} md={4} lg={3} key={category.id}>
              <LinkContainer to="/hi">
                <Card className="mb-3 bg-white">
                  <Card.Img
                    variant="top"
                    src={category.imageSrc}
                    alt={category.altText}
                  />
                  {/* Placeholder for link, adjust as needed */}
                </Card>
              </LinkContainer>
            </Col>
          ))}
        </Row>
        

        <div className="d-flex justify-content-center mt-5">
          <Button variant="primary">Show all products</Button>

          <Link to="/add-product">
          <Button variant="primary">Add Product</Button>
        </Link>
        </div>

        
       
      </Container>

      {/* Discount Section */}
      <Container fluid className="discount_section my-5">
        <Row>
          <Col lg={3} md={5} className="offset-md-2">
            <h2>
              <strong>
                You get <br /> any medicine <br /> on{" "}
                <span> 10% discount </span>
              </strong>
            </h2>
            <p>
              <strong>
                It is a long established fact that a reader will be distracted
                by
              </strong>
            </p>
            <Button variant="primary">Buy Now</Button>
            
          </Col>
          <Col lg={7} md={5}>
            <Image src="images/medicines.jpg" alt="" fluid />
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <Container className="features text-center my-5">
        <Image className="mb-4" src="images/saydla2.png" alt="" fluid />
        <h2>We are Helping you 24/7</h2>
        <p className="text-black-50 text-uppercase">
          We provide many services to help you
        </p>
        {/* Example service, repeat as needed */}
      </Container>
    </>
  );
};

export default MainPage;
