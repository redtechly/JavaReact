import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Axios from "axios"; // Import Axios for making HTTP requests
import { REST_API_BASE_URL } from "../App";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data } = await Axios.post(`${REST_API_BASE_URL}/user/login`, {
          email,
          password,
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      } catch (err) {
        toast.error("Error logging in");
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Container className="login-container">
      <h1 className="login-header">Log In</h1>
      <Form onSubmit={submitHandler} className="login-form">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="login-button">
          Log In
        </Button>
      </Form>
      <div className="signup-link">
        New customer?{" "}
        <Link to={`/signup`} className="signup-link">
          Create your account
        </Link>
      </div>
    </Container>
  );
};

export default LoginScreen;
