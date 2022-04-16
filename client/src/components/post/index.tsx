import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Post } from "../../utils/gql";

const PostCard = (props: any): ReactElement => {


  return (
    <>
      {props.posts.map((post: Post) => (
        <Card key={post._id.toString()}>
          <Card.Header>
            <Link to={`/blog/${post._id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p>{post.created_At}</p>
          </Card.Header>
          <Card.Body>
            <p>{post.content}</p>
          </Card.Body>
          <Card.Footer>
            <p>{post.tags.join(", ")}</p>
          </Card.Footer>
        </Card>
      ))}
    </>
  )
}

export default PostCard;