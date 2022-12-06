import { ReactElement } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { QueryResult, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { QUERY_ONE_SONG } from "../../utils/gql";
import { Song } from "../../utils/interfaces";


const SongPage = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams<string>();
  const navigate: NavigateFunction = useNavigate();

  const { loading: songLoading, data: songData, error: songError } = useQuery(QUERY_ONE_SONG,
    {
      variables: { id: params.songId }
    });
  const song: Song = songData?.getOneSong || {};

  if (songLoading) {
    return <h1>Loading....</h1>
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} className="transpBground">

            <Row>
              <Col sm={6}>
                <Row>
                  <h1>{song.songTitle}</h1>
                </Row>

                <Row>
                  <p>Voicing: {song.songVoicing}</p>
                </Row>

                <Row>
                  {/* TODO: Make the preview a modal & add demo track to it */}
                  {song.songPreview
                  ? <p>Instrumentation (click to hear demo track and see preview): {song.songAccompaniment.map((ins: string): string => `<br />${ins}`)}</p>
                  : <p>Instrumentation: {song.songAccompaniment.map((ins: string): string => ins)}</p>}
                </Row>

                {song.songYear &&
                  <Row>
                    <p>Year composed: {song.songYear}</p>
                  </Row>}

                <Row>
                  {song.songSacred === true
                    ? <p>Sacred</p>
                    : <p>Secular</p>}
                </Row>

                {song.songSacred &&
                  <Row>
                    <p>Liturgical season: {song.songLiturgy}</p>
                  </Row>}
              </Col>
            </Row>

            {/* TODO: Embed this */}
            {song.songTrack &&
              <Row>
                <p>Demo track: {song.songTrack}</p>
              </Row>}

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SongPage;