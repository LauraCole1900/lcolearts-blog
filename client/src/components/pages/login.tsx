import React, { KeyboardEvent, ReactElement, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOG_ME_IN } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";

const LoginPage = (): ReactElement => {

  const [userData, setUserData] = useState<Object>({ email: "", password: "" });
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOG_ME_IN);

  const handleInputChange = (e: KeyboardEvent): Object | void => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData({ ...userData, [name]: value })
  };


  return (
    <>

    </>
  )
}

export default LoginPage;