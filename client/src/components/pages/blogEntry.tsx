import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ONE_ENTRY } from "../../utils/gql";

const BlogEntry = (): ReactElement => {

  const params: any = useParams();

  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ONE_ENTRY,
    {
      variables: { id: params.blogId }
    });
  const entry = postData?.getEntry || {};


  if (postLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <h1>{entry.postTitle}</h1>
          </Col>
        </Row>

        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: entry.postBody }} />
          </Col>
        </Row>

        <Row>
          <Col sm={{span: 10, offset: 1}}>
            <p className="tags">{entry.postKeywords.join(", ")}</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BlogEntry;