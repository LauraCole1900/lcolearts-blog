import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { ApolloCache, useMutation, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { TagCloud } from "react-tagcloud";
import { DELETE_ENTRY, QUERY_ALL_ENTRIES } from "../../utils/gql";
import { Post } from "../../utils/interfaces";
import PostCard from "../post";
import { ConfirmModal, ErrorModal, SuccessModal } from "../modals";

const Music = (): ReactElement => {

  return (
    <Container>
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          <h1>Compositions Coming Soon!</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Music;