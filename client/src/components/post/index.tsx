import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { Post } from "../../utils/gql";
import "./style.css";

const PostCard = (props: any): ReactElement => {


  return (
    <>
      {props.entries?.map((post: Post) => (
        <Card key={post!._id!.toString()}>
          <Card.Header className="postHeader">
            <Link to={`/blog/${post._id}`} className="blogLink">
              <h1>{post!.postTitle}</h1>
            </Link>
            <p>{dayjs(JSON.parse(post.postDate!)).format("MMM D, YYYY h:mma")}</p>
          </Card.Header>
          <Card.Body className="postBody">
            <p className="tags">tags: {post.postKeywords.join(", ")}</p>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default PostCard;