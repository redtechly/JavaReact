import React, { useContext, useReducer, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { toast } from "react-toastify";
import axios from "axios";
import { REST_API_BASE_URL } from "../App";
import { getUser } from "../services/UserService";
import LoadingBox from "./LoadingBox";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading } = useQuery(
    ["Get My User", userInfo.user.id],
    () => getUser(Number(userInfo.user.id)),
    {
      onSuccess: (data) => {
        setName(data.name);
        setEmail(data.email);
      },
    }
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }
    try {
      const { data } = await axios.put(
        `${REST_API_BASE_URL}/user/${userInfo.user.id}`,
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      const newData = {
        token: userInfo.token,
        user: data,
      };
      ctxDispatch({ type: "USER_SIGNIN", payload: newData });
      localStorage.setItem("userInfo", JSON.stringify(newData));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(err);
    }
  };

  return isLoading ? (
    LoadingBox
  ) : (
    
    
    <div className="container small-container">
    <Link to="/Dashboard" className="btn btn-primary">dashboard</Link>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
   
  );
}
