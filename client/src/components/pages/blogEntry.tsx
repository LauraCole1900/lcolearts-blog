import React, { ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { QUERY_ONE_ENTRY } from "../../utils/gql";

const BlogEntry = (): ReactElement => {

  const params: any = useParams();
  const navigate: any = useNavigate();

  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ONE_ENTRY,
    {
      variables: { id: params.blogId }
    });
  const entry = postData?.getEntry || {};

  const handleKeyword = (word: string) => {
    navigate(`/tags/${word}`)
  };


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
              <p className="tags">tags: {entry.postKeywords.map((keyword: string, i: number): any => (
                i !== entry.postKeywords.length - 1
                  ? <span key={`${entry._id}-${i}`} onClick={(): MouseEvent | void => handleKeyword(keyword)}><span className="tagWord">{keyword}</span>, </span>
                  : <span key={`${entry._id}-${i}`} onClick={(): MouseEvent | void => handleKeyword(keyword)}><span className="tagWord">{keyword}</span></span>
              ))}</p>
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