import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOG_ME_IN } from "../../utils/gql";
import Auth from "../../utils/auth";
import { User } from "../../utils/interfaces";
import "./style.css";

const LoginPage = (): ReactElement => {

  const [userData, setUserData] = useState<User>({ userName: "", password: "" });
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOG_ME_IN);

  const handleInputChange = (e: ChangeEvent): Object | void => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value })
  };

  // Handles form submission
  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    console.log({ userData });
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userData },
      });
      console.log({ data });
      Auth.login(data.login.token);

      // clear form values
      setUserData({
        userName: "",
        password: "",
      });
      navigate("/post_form");
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };


  return (
    <>
      <Container fluid className="login">
        <Card>
          <Card.Header className="cardTitle">
            <h1>Log in</h1>
          </Card.Header>
          <Card.Body className="cardBody">
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="loginLabel">Username: <span className="red">*</span></Form.Label>
                    <Form.Control type="input" name="userName" placeholder="My name" value={userData.userName} className="formInput" onChange={e => handleInputChange(e)} required />
                    <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="loginLabel">Password: <span className="red">*</span></Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter password here" value={userData.password} className="formInput" onChange={e => handleInputChange(e)} required />
                    <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Button disabled={!(userData.userName && userData.password)} type="submit" className="loginBtn">
                  Login
                </Button>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default LoginPage;