import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { postValidate } from "../../utils/validation";
import { CREATE_ENTRY, EDIT_ENTRY, QUERY_ME, QUERY_ALL_ENTRIES, QUERY_ONE_ENTRY } from "../../utils/gql";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import EditorContainer from "../richTextEditor";
import "./style.css";


const PostForm = () => {

  //=====================//
  //   Global Variables  //
  //=====================//

  // Params
  const params = useParams();

  // State variables
  const [pageReady, setPageReady] = useState(false);
  const [postId, setPostId] = useState(params.postId);
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    postTitle: "",
    postBody: "",
    postKeywords: []
  });
  const currentPostData = useRef(postData);

  // States passed to modals
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();

  // Modal states
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError } = useQuery(QUERY_ME);

  const { loading: noteLoading, data: noteData, error: noteError } = useQuery(QUERY_ONE_ENTRY,
    {
      variables: { id: postId }
    });

  const me = meData?.me || meData?.currentId || {};
  const postToEdit = useMemo(() => { return noteData?.onePost || {} }, [noteData?.onePost]);


  //=====================//
  //      Mutations      //
  //=====================//

  const [addPost, { addPostError, addPostData }] = useMutation(CREATE_ENTRY, {
    update(cache, { data: { addPost } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const allData = cache.readQuery({ query: QUERY_ALL_ENTRIES });
        const currentPosts = allData.allPosts;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_ENTRIES,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allPosts: [...currentPosts, addPost] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [editPost, { editPostError, editPostData }] = useMutation(EDIT_ENTRY);


  //=====================//
  //       Methods       //
  //=====================//

  // Sets boolean to show or hide relevant modal
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);
  const handleShowErr = () => setShowErr(true);
  const handleHideErr = () => setShowErr(false);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => {
      currentPostData.current = { ...prev, [name]: value };
      return { ...prev, [name]: value };
    });
  };

  // Handles input changes to editor
  const handleEditorChange = (name, value) => {
    setPostData(prev => {
      currentPostData.current = { ...prev, [name]: value };
      return { ...prev, [name]: value };
    });
  };

  // Creates array from keywords
  const handleKeywordArray = () => {
    if (postData.postKeywords.length > 0) {
      const keywordArr = postData.postKeywords.split(",");
      setPostData({ ...postData, postKeywords: keywordArr });
    }
  }

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = postValidate(postData);
    const noErrors = Object.keys(validationErrors).some(val => validationErrors[val] === "");
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await addPost({
          variables: { ...postData, postBody: draftToHtml(convertToRaw(postData.postBody.getCurrentContent())) }
        });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setPostData({
        postTitle: "",
        postBody: "",
        postKeywords: []
      });
    } else {
      console.error({ validationErrors });
    }
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = postValidate(postData);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editPost({
          variables: { id: postId, ...postData, postBody: draftToHtml(convertToRaw(postData.postBody.getCurrentContent())) }
        });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setPostData({
        postTitle: "",
        postBody: "",
        postKeywords: []
      });
    } else {
      console.error({ validationErrors });
    }
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (Object.keys(params).length > 0 && Object.keys(postToEdit).length > 0) {
      setPostData(postToEdit);
      setPageReady(true);
    }

    if (!Object.keys(params).length) {
      setPageReady(true);
    }
  }, [postToEdit, me.section, params]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || noteLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/blog" />
  };


  return (
    <>
      {pageReady === true &&
        <Container>
          <Row>
            <Col sm={12} className="formHeader">
              {Object.keys(params).length > 0
                ? <h1>Edit this post</h1>
                : <h1>Create new post</h1>}
            </Col>
          </Row>

          <Form className="postForm">

            <Form.Group controlId="formPostTitle">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Post title: <span className="red">*</span></Form.Label>
                  {errors.postTitle &&
                    <div className="error"><p>{errors.postTitle}</p></div>}
                  <Form.Control type="input" name="postTitle" placeholder="Title of your post" value={postData.postTitle} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPostBody">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Post body: <span className="red">*</span></Form.Label>
                  {errors.postBody &&
                    <div className="error"><p>{errors.postBody}</p></div>}
                  <EditorContainer value={postData.postBody} name="postBody" onChange={handleEditorChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPostKeywords">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Post keywords:</Form.Label>
                  {errors.postKeywords &&
                    <div className="error"><p>{errors.postKeywords}</p></div>}
                  <Form.Control type="input" name="postKeywords" placeholder="Keywords" value={postData.postKeywords} className="formInput" onChange={handleInputChange} onBlur={handleKeywordArray} />
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                {!Object.keys(params).length
                  ? <Button data-toggle="popover" title="Submit" disabled={!(postData.postTitle && postData.postBody)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
                  : <Button data-toggle="popover" title="Update" disabled={!(postData.postTitle && postData.postBody)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
                }
              </Col>
            </Row>

          </Form>

          <SuccessModal
            btnname={btnName}
            params={[]}
            show={showSuccess === true}
            hide={() => handleHideSuccess()}
          />

          <ErrorModal
            errmsg={errThrown}
            btnname={btnName}
            show={showErr === true}
            hide={() => handleHideErr()}
          />

        </Container>
      }
    </>
  )
}

export default PostForm;