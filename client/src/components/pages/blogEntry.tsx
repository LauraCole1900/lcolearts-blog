import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
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
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} className="transpBground">

            <Row>
              <h1>{entry.postTitle}</h1>
              <p>{dayjs(JSON.parse(entry.postDate!)).format("MMM D, YYYY h:mma")}</p>
            </Row>

            <Row>
              <p className="tags">tags: {entry.postKeywords.join(", ")}</p>
            </Row>

            <Row>
              <div dangerouslySetInnerHTML={{ __html: entry.postBody }} />
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BlogEntry;