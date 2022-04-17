import React, { ReactElement } from "react";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { QUERY_ALL_ENTRIES } from "../../utils/gql";
import PostCard from "../post";

const Blog = (): ReactElement => {
  // GraphQL variables
  const { loading, data, refetch } = useQuery(QUERY_ALL_ENTRIES, {});
  const entriesArr = data?.getAllEntries || [];
  const arrToSort = [...entriesArr];
  const sortedEntries = arrToSort.sort((a, b) => (a.created_At > b.created_At) ? 1 : -1)


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <h1>Blog</h1>
          </Col>
        </Row>
        {loading &&
          <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <p>Loading....</p>
            </Col>
          </Row>}
        {data?.length
          ? <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <PostCard entries={sortedEntries} />
            </Col>
          </Row>
          : <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <h1>Coming soon!</h1>
            </Col>
          </Row>}
      </Container>
    </>
  )
}

export default Blog;