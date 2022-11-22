import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { songValidate } from "../../utils/validation";
import { CREATE_SONG, EDIT_SONG, QUERY_ALL_SONGS, QUERY_ME, QUERY_ONE_SONG } from "../../utils/gql";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import { Song } from '../../utils/interfaces';
import "./style.css";


const SongForm = () => {

  //=====================//
  //   Global Variables  //
  //=====================//

  // Params
  const params = useParams();

  // State variables
  const [pageReady, setPageReady] = useState(false);
  const [songId, setSongId] = useState(params.songId);
  const [errors, setErrors] = useState({});
  const [songData, setSongData] = useState({
    songTitle: "",
    songVoicing: "",
    songAccompaniment: [""],
    songSacred: false,
    songLiturgy: "",
    songTrack: "",
    songPreview: "",
  });
  const currentPostData = useRef(songData);

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

  const { loading: thisSongLoading, data: thisSongData, error: thisSongError } = useQuery(QUERY_ONE_SONG,
    {
      variables: { id: songId }
    });

  const me = meData?.me || meData?.currentId || {};
  const songToEdit = useMemo(() => { return thisSongData?.getSong || {} }, [thisSongData?.getSong]);


  //=====================//
  //      Mutations      //
  //=====================//

  const [createSong, { error: createSongError, data: createSongData }] = useMutation(CREATE_SONG, {
    update(cache, { data: { createSong } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const allData = cache.readQuery({ query: QUERY_ALL_SONGS });
        const currentSongs = allData.getAllSongs;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_SONGS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { getAllEntries: [...currentSongs, createSong] },
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  const [editSong, { error: editSongError, data: editSongData }] = useMutation(EDIT_SONG);


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
    setSongData({ ...songData, [name]: value });
    if (name === "postKeywords") {
      let dataArr = value.split(",");
      let trimmedArr = dataArr.map(item => item.trim())
      setSongData({ ...songData, [name]: trimmedArr });
    }
  };

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors: boolean = Object.keys(validationErrors).some(val => validationErrors[val] === "");
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await createSong({
          variables: { ...songData }
        });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.stringify(error));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
        songTitle: "",
        songVoicing: "",
        songAccompaniment: [],
        songSacred: false,
        songLiturgy: "",
        songTrack: "",
        songPreview: "",
      });
    } else {
      console.error({ validationErrors });
    }
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    console.log({ songData }, { songId });
    e.preventDefault();
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors = Object.keys(validationErrors).some(val => validationErrors[val] === "");
    setErrors(validationErrors);
    if (noErrors) {
      try {
        console.log("ding");
        const { data } = await editSong({
          variables: { id: songId, ...songData }
        });
        console.log({ data });
        handleShowSuccess();
      } catch (error) {
        console.error(JSON.parse(JSON.stringify(error)));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
        songTitle: "",
        songVoicing: "",
        songAccompaniment: [],
        songSacred: false,
        songLiturgy: "",
        songTrack: "",
        songPreview: "",
      });
    } else {
      console.error({ validationErrors });
    }
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (Object.keys(params).length > 0 && Object.keys(songToEdit).length > 0) {
      setSongData(songToEdit);
      setPageReady(true);
    }

    if (!Object.keys(params).length) {
      setPageReady(true);
    }
  }, [songToEdit, me.section, params]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || thisSongLoading) {
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
                  {errors.songTitle &&
                    <div className="error"><p>{errors.songTitle}</p></div>}
                  <Form.Control type="input" name="postTitle" placeholder="Title of your post" value={songData.songTitle} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formPostBody">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Post body: <span className="red">*</span></Form.Label>
                  {errors.songVoicing &&
                    <div className="error"><p>{errors.songVoicing}</p></div>}
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
                  <Form.Control type="input" name="postKeywords" placeholder="Keywords" value={postData.postKeywords} className="formInput" onChange={handleInputChange} />
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

export default SongForm;