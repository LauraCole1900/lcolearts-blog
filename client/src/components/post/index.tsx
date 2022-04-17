import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Post } from "../../utils/gql";

const PostCard = (props: any): ReactElement => {


  return (
    <>
      {props.posts.map((post: Post) => (
        <Card key={post!._id!.toString()}>
          <Card.Header>
            <Link to={`/blog/${post._id}`}>
              <h1>{post!.postTitle}</h1>
            </Link>
            <p>{post.postDate}</p>
          </Card.Header>
          <Card.Body>
            <p>{post.postBody}</p>
          </Card.Body>
          <Card.Footer>
            <p>{post.postKeywords.join(", ")}</p>
          </Card.Footer>
        </Card>
      ))}
    </>
  )
}

export default PostCard;