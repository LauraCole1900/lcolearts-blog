import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { Post } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";

const PostCard = (props: any): ReactElement => {


  return (
    <>
      {props.entries?.map((post: Post) => (
        <Card key={post!._id!.toString()}>
          <Card.Header className="postHeader">
            <div>
              <Link to={`/blog/${post._id}`} className="blogLink">
                <h1>{post!.postTitle}</h1>
              </Link>
              <p>{dayjs(JSON.parse(post.postDate!)).format("MMM D, YYYY h:mma")}</p>
            </div>
            {Auth.loggedIn() &&
              <div>
                <Link to={`/edit_post/${post._id}`} className="navlink">
                  <p>Edit</p>
                </Link>
                <p>Delete</p>
              </div>}
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