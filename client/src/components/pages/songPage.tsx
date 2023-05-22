import { ReactElement, useEffect } from "react";
import { Link, NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Col, Container, Row } from "react-bootstrap";
import { QUERY_ONE_SONG } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { AudioEmbed, VideoEmbed } from "../embed";
import NotFound from './notFound';


const SongPage = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams<string>();
  const navigate: NavigateFunction = useNavigate();

  const { loading: songLoading, data: songData, error: songError } = useQuery(QUERY_ONE_SONG,
    {
      variables: { id: params.songId }
    });
  const song: Song = songData?.getSong || {};


  const goBack = (): void => {
    navigate(-1);
  }

  // Set tab text on initial render/when data comes back from the database
  useEffect((): void => {
    if (!songError) {
      song.songTitle ? document.title = `${song.songTitle}` : document.title = `My Music`
    }
  }, [song]);


  if (songLoading) {
    return <h1>Loading....</h1>
  };

  if (songError) {
    return <NotFound />
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} className="transpBground">
            <Row>
              <h1>{song.songTitle}</h1>
            </Row>

            <Row>
              <p className="purchaseThis">*** If you are interested in purchasing copies of this composition, please <a href="mailto:lauracole1900@comcast.net">email me</a> ***</p>
            </Row>

            <Row>
              <Col sm={6}>

                <Row>
                  {song.songSacred === true
                    ? <p className="bold">Sacred</p>
                    : <p className="bold">Secular</p>}
                </Row>

                {song.songSacred &&
                  <Row>
                    <p><span className="bold">Liturgical season:</span> {song.songLiturgy}</p>
                  </Row>}

                <Row>
                  <p><span className="bold">Voicing:</span> {song.songVoicing}</p>
                </Row>

                <Row>
                  <p><span className="bold">Instrumentation:</span> {song.songAccompaniment}</p>
                </Row>

                {song.songYear &&
                  <Row>
                    <p><span className="bold">Year composed:</span> {song.songYear}</p>
                  </Row>}

                {song.songMajorWork &&
                  <>
                    <p><span className="bold">Movements:</span></p>
                    {song.songMvmtNames.map((title: string, i: number) =>
                      <>
                        <p key={`${song._id}${i}`} className="mvmtNames mvmtMargins">{title}</p>
                        <AudioEmbed title={title} src={song.songMvmtTracks[i]} songId={song._id} />
                      </>)}
                  </>}

                {song.songTrack &&
                  <Row className="audioEmbed">
                    <p>Demo track:</p>
                    <AudioEmbed title={song.songTitle} src={song.songTrack} songId={song._id} />
                  </Row>}

              </Col>

              {/* TODO: Embed this */}
              {song.songPreview &&
                <Col sm={6} className="previewEmbed">
                  <Row>
                    <object data={song.songPreview} type="application/pdf" className="pdfEmbed">
                      <p>Alternative text - include a link <a href={song.songPreview}>to the PDF!</a></p>
                    </object>
                    <a href={song.songPreview} target="_blank" rel="noreferrer">Preview {song.songTitle} full size</a>
                  </Row>
                </Col>}

              {/* TODO: And this */}
              {song.songMvmtPreviews[0] &&
                <Col sm={6} className="previewEmbed">
                  {song.songMvmtPreviews.map((preview: string, i: number): ReactElement =>
                    <Row key={`${i}${song._id}`} className="previewEmbed">
                      <p>{song.songMvmtNames[i]} preview:</p>
                      <object data={preview} type="application/pdf" className="pdfEmbed">
                        <p>Alternative text - include a link <a href={preview}>to the PDF!</a></p>
                      </object>
                      <a href={preview} target="_blank" rel="noreferrer">Preview {song.songMvmtNames[i]} full size</a>
                    </Row>
                  )}
                </Col>}
            </Row>

            {song.songVideo &&
              <Row className="centered videoEmbed">
                <VideoEmbed src={song.songVideo} title={song.songTitle} />
              </Row>
            }

            <Button className="btn songBtn" onClick={goBack}>Return to list</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SongPage;