import React, { ReactElement } from "react";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { QUERY_ALL_ENTRIES } from "../../utils/gql";
import PostCard from "../post";
import { Post } from "../../utils/interfaces";

const Blog = (): ReactElement => {
  // GraphQL variables
  const { loading, data, refetch } = useQuery(QUERY_ALL_ENTRIES, {});
  const entriesArr: Post[] = data?.getAllEntries || [];
  const arrToSort: Post[] = [...entriesArr];
  const sortedEntries: Post[] = arrToSort.sort((a, b) => (a.postDate! < b.postDate!) ? 1 : -1)


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
        {sortedEntries?.length
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