import React, { MouseEvent, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { Post } from "../../utils/gql";
import Auth from "../../utils/auth";
import "./style.css";

const PostCard = (props: any): ReactElement => {

  const handleDeleteClick = (id: string): void => {
    props.setEntryId(id);
    props.handleShowConfirm();
  };

  const trimBody = (body: string, id: string | undefined): string => {
    if (body.length > 125) {
      const bodyString: string = body.substring(0, 125);
      const linkString: string = `<a href="/blog/${id}">...</a>`
      body = bodyString.concat(linkString);
    }
    return body;
  };


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
                  <Button className="btn cardBtn">
                    <p>Edit</p>
                  </Button>
                </Link>
                <Button className="btn cardBtn" data-id={post._id} onClick={(): void => handleDeleteClick(post._id!)}>
                  <p>Delete</p>
                </Button>
              </div>}
          </Card.Header>
          <Card.Body className="postBody">
            <p className="tags">tags: {post.postKeywords.map((keyword: string, i: number): any => (
              i !== post.postKeywords.length - 1
                ? <span key={`${post._id}-${i}`} onClick={(): MouseEvent | void => props.handleKeyword(keyword)}><span className="tagWord">{keyword}</span>, </span>
                : <span key={`${post._id}-${i}`} onClick={(): MouseEvent | void => props.handleKeyword(keyword)}><span className="tagWord">{keyword}</span></span>
            ))}
            </p>
            <div className="truncatedPost" dangerouslySetInnerHTML={{ __html: trimBody(post.postBody, post._id) }} />
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default PostCard;