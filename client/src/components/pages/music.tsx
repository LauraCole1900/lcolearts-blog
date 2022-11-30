import { ReactElement, useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { ApolloCache, useMutation, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { DELETE_SONG, QUERY_ALL_SONGS } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { SongCard } from "../cards";
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