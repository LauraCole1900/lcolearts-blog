import React, { ReactElement } from "react";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import "./style.css";

const PostForm = (): ReactElement => {


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} className="center">
            <h1>New post</h1>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default PostForm;