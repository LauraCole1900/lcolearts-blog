import { ChangeEvent, FocusEvent, FormEvent, ReactElement, useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ApolloCache, QueryResult, useMutation, useQuery } from "@apollo/client";
import { songValidate } from "../../utils/validation";
import { CREATE_SONG, EDIT_SONG, QUERY_ALL_SONGS, QUERY_ME, QUERY_ONE_SONG } from "../../utils/gql";
import Auth from "../../utils/auth";
import { ErrorModal, SuccessModal } from "../modals";
import CloudinaryUploadWidget from "../uploadWidget";
import { Song, SongErrors, User } from '../../utils/interfaces';
import "./style.css";


const SongForm = (): ReactElement => {


  //=====================//
  //   Global Variables  //
  //=====================//

  // Params
  const params = useParams();

  // State variables
  const [pageReady, setPageReady] = useState(false);
  const [songId, setSongId] = useState(params.songId);
  const [errors, setErrors] = useState<SongErrors | undefined>();
  const [dataRes, setDataRes] = useState<any>({});
  const [songData, setSongData] = useState({
    songTitle: "",
    songVoicing: "",
    songAccompaniment: "",
    songMajorWork: false,
    songMvmtNames: [""],
    songMvmtTracks: [""],
    songMvmtPreviews: [""],
    songSacred: false,
    songLiturgy: "",
    songTrack: "",
    songVideo: "",
    songPreview: "",
    songYear: ""
  });

  // States passed to modals
  const [errThrown, setErrThrown] = useState();
  const [btnName, setBtnName] = useState();

  // Modal states
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  //=====================//
  //       Queries       //
  //=====================//

  const { loading: meLoading, data: meData, error: meError }: QueryResult = useQuery(QUERY_ME);

  const { loading: currSongLoading, data: currSongData, error: currSongError } = useQuery(QUERY_ONE_SONG,
    {
      variables: { id: songId }
    });

  const me: User = useMemo(() => { return meData?.me || meData?.currentId || {} }, [meData?.me, meData?.currentId]);
  const songToEdit: Song = useMemo(() => { return currSongData?.getSong || {} }, [currSongData?.getSong]);


  //=====================//
  //      Mutations      //
  //=====================//

  const [createSong, { error: createSongError, data: createSongData }] = useMutation(CREATE_SONG, {
    update(cache: ApolloCache<Array<Song>>, { data: { createSong } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const allData: any = cache.readQuery({ query: QUERY_ALL_SONGS });
        const currentSongs: Array<Song> = allData.getAllSongs;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_SONGS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { getAllSongs: [...currentSongs, createSong] },
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
  const handleInputChange = (e: ChangeEvent<HTMLElement>): void => {
    const { name, value } = e.target as HTMLInputElement;
    setSongData({ ...songData, [name]: value });
    if (["songSacred", "songMajorWork"].includes(name)) {
      setSongData({ ...songData, [name]: JSON.parse(value) });
    }

    if ("songMajorWork" === name) {
      setSongData({ ...songData, [name]: !songData.songMajorWork })
    }
  };

  // Handles trimming array elements
  const handleTrim = (e: FocusEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    const splitArr: Array<string> = value.split(',');
    const trimmedArr: Array<string> = splitArr.map((mvmt: string): string => mvmt.trim());
    setSongData({ ...songData, [name]: trimmedArr });
  }

  // Handles click on "Submit" button
  const handleFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors: SongErrors = songValidate(songData);
    const noErrors: boolean = Object.keys(validationErrors).some((val: string) => validationErrors[val] === "");
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await createSong({
          variables: { ...songData }
        });
        handleShowSuccess();
      } catch (error: any) {
        console.error(JSON.parse(JSON.stringify(error)));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
        songTitle: "",
        songVoicing: "",
        songAccompaniment: "",
        songMajorWork: false,
        songMvmtNames: [""],
        songMvmtTracks: [""],
        songMvmtPreviews: [""],
        songSacred: false,
        songLiturgy: "",
        songTrack: "",
        songVideo: "",
        songPreview: "",
        songYear: ""
      });
    } else {
      console.error({ validationErrors });
    }
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    // Validates required inputs
    const validationErrors = songValidate(songData);
    const noErrors = Object.keys(validationErrors).some(val => validationErrors[val] === "");
    setErrors(validationErrors);
    if (noErrors) {
      try {
        const { data } = await editSong({
          variables: { id: songId, ...songData }
        });
        handleShowSuccess();
      } catch (error: any) {
        console.error(JSON.parse(JSON.stringify(error)));
        setErrThrown(error.message);
        handleShowErr();
      }
      setSongData({
        songTitle: "",
        songVoicing: "",
        songAccompaniment: "",
        songMajorWork: false,
        songMvmtNames: [""],
        songMvmtTracks: [""],
        songMvmtPreviews: [""],
        songSacred: false,
        songLiturgy: "",
        songTrack: "",
        songVideo: "",
        songPreview: "",
        songYear: ""
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
  }, [dataRes, me, params, songToEdit]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || currSongLoading) {
    return <h1>Loading....</h1>
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/music/page/1" />
  };


  return (
    <>
      {pageReady === true &&
        <Container className="ltBg">
          <Row>
            <Col sm={12} className="formHeader">
              {Object.keys(params).length > 0
                ? <h1>Edit this song</h1>
                : <h1>Create new song</h1>}
            </Col>
          </Row>

          <Form className="songForm">

            <Form.Group controlId="formSongTitle">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Song title: <span className="red">*</span></Form.Label>
                  {errors?.songTitle &&
                    <div className="error"><p>{errors.songTitle}</p></div>}
                  <Form.Control type="input" name="songTitle" placeholder="Title of your song" value={songData.songTitle} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSongVoicing">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Song voicing: <span className="red">*</span></Form.Label>
                  {errors?.songVoicing &&
                    <div className="error"><p>{errors.songVoicing}</p></div>}
                  <Form.Control type="input" name="songVoicing" placeholder="Voicing of your song" value={songData.songVoicing} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSongAcc">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Song accompaniment: <span className="red">*</span></Form.Label>
                  {errors?.songAccompaniment &&
                    <div className="error"><p>{errors.songAccompaniment}</p></div>}
                  <Form.Control type="input" name="songAccompaniment" placeholder="Accompaniment" value={songData.songAccompaniment} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSongYear">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Year composed:</Form.Label>
                  <Form.Control type="input" name="songYear" placeholder="Year" value={songData.songYear} className="formInput" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSongSacred">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Sacred or secular? <span className="red">*</span></Form.Label>
                  {errors?.songSacred &&
                    <div className="error"><p>{errors.songSacred}</p></div>}<br />
                  <Form.Check type="radio" name="songSacred" label="Sacred" checked={songData.songSacred === true} value={"true"} inline className="formRadio" onChange={handleInputChange} />
                  <Form.Check type="radio" name="songSacred" label="Secular" checked={songData.songSacred === false} value={"false"} inline className="formRadio" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formSongMW">
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Form.Label>Check for major work</Form.Label>
                  <Form.Check type="checkbox" name="songMajorWork" label="Major Work?" checked={songData.songMajorWork === true} value={"true"} className="formRadio" onChange={handleInputChange} />
                </Col>
              </Row>
            </Form.Group>

            {songData.songMajorWork &&
              <Form.Group controlId="formSongMWMvmts">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Names of movements:</Form.Label>
                    <Form.Control type="input" name="songMvmtNames" placeholder="Please comma-separate movement names" value={songData.songMvmtNames} className="formInput" onChange={handleInputChange} onBlur={handleTrim} />
                  </Col>
                </Row>
              </Form.Group>
            }

            {songData.songSacred &&
              <Form.Group controlId="formSongLit">
                <Row>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Form.Label>Liturgical season:</Form.Label>
                    <Form.Control type="input" name="songLiturgy" placeholder="Liturgical season" value={songData.songLiturgy} className="formInput" onChange={handleInputChange} />
                  </Col>
                </Row>
              </Form.Group>}

            {songData.songMajorWork
              ? <>
                <Form.Group controlId="formMWTracks">
                  <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                      <Form.Label>URLs for demo tracks:</Form.Label>
                      <Form.Control type="input" name="songMvmtTracks" placeholder="Please comma-separate URLs" value={songData.songMvmtTracks} className="formInput" onChange={handleInputChange} onBlur={handleTrim} />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formMWPreviews">
                  <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                      <Form.Label>URLs for previews:</Form.Label>
                      <Form.Control type="input" name="songMvmtPreviews" placeholder="Please comma-separate URLs" value={songData.songMvmtPreviews} className="formInput" onChange={handleInputChange} onBlur={handleTrim} />
                    </Col>
                  </Row>
                </Form.Group></>
              : <>
                <Form.Group controlId="formSongTrack">
                  <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                      <Form.Label>URL for demo track:</Form.Label>
                      <Form.Control type="input" name="songTrack" placeholder="Demo track" value={songData.songTrack} className="formInput" onChange={handleInputChange} />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formSongVideo">
                  <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                      <Form.Label>URL for video:</Form.Label>
                      <Form.Control type="input" name="songVideo" placeholder="https://youtube.com/embed/youTubeID" value={songData.songVideo} className="formInput" onChange={handleInputChange} />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formSongPreview">
                  <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                      <Form.Label>URL for preview:</Form.Label>
                      <Form.Control type="input" name="songPreview" placeholder="Preview" value={songData.songPreview} className="formInput" onChange={handleInputChange} />
                    </Col>
                  </Row>
                </Form.Group>
              </>}

            <Row>
              <Col sm={{ span: 3, offset: 2 }}>
                <CloudinaryUploadWidget dataRes={dataRes} setDataRes={setDataRes} />
              </Col>

              <Col sm={{span: 3, offset: 2}}>
                {!Object.keys(params).length
                  ? <Button data-toggle="popover" title="Submit" disabled={!(songData.songTitle && songData.songVoicing && songData.songAccompaniment)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
                  : <Button data-toggle="popover" title="Update" disabled={!(songData.songTitle && songData.songVoicing && songData.songAccompaniment)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
                }
              </Col>
            </Row>

            {Object.keys(dataRes).length > 0 &&
              <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                  <p className="bold">Here is the URL of the uploaded file: {dataRes.info.secure_url}</p>
                </Col>
              </Row>}

            <Row>

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