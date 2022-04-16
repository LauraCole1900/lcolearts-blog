import React, { KeyboardEvent, MouseEvent, ReactElement, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOG_ME_IN } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";

const LoginPage = (): ReactElement => {

  const [userData, setUserData] = useState<Object>({ userName: "", password: "" });
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOG_ME_IN);

  const handleInputChange = (e: KeyboardEvent): Object | void => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value })
  };

  // Handles form submission
  const handleFormSubmit = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget as HTMLButtonElement;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // clear form values
    setUserData({
      userName: "",
      password: "",
    });
    navigate("/postForm");
  };


  return (
    <>
      <h1>This is going to be the login page.</h1>
    </>
  )
}

export default LoginPage;