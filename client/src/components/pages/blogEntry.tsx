/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { QUERY_ONE_ENTRY } from "../../utils/gql";
import { Post } from "../../utils/interfaces";
import NotFound from './notFound';


const BlogEntry = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams<string>();
  const navigate: NavigateFunction = useNavigate();

  const { loading: postLoading, data: postData, error: postError } = useQuery(QUERY_ONE_ENTRY,
    {
      variables: { id: params.blogId }
    });
  const entry: Post = postData?.getEntry || {};

  const handleKeyword = (word: string): void => {
    navigate(`/tags/${word}`)
  };

  useEffect((): void => {
    if (!postError) {
      entry.postTitle ? document.title = `${entry.postTitle}` : document.title = `My Blog`
    }
  }, [entry]);


  if (postLoading) {
    return <h1>Loading....</h1>
  };

  if (postError) {
    return <NotFound />
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
              <p className="tags">tags: {entry.postKeywords.map((keyword: string, i: number): ReactElement => (
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