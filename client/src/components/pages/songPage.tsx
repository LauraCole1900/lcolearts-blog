import { ReactElement } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";
import { QueryResult, useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { QUERY_ONE_SONG } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { AudioEmbed, VideoEmbed } from "../embed";


const SongPage = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams<string>();
  const navigate: NavigateFunction = useNavigate();

  const { loading: songLoading, data: songData, error: songError } = useQuery(QUERY_ONE_SONG,
    {
      variables: { id: params.songId }
    });
  const song: Song = songData?.getSong || {};

  if (songLoading) {
    return <h1>Loading....</h1>
  };


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }} className="transpBground">
            <h1>{song.songTitle}</h1>

            <Row>
              <Col sm={6}>
                <Row>
                  <p><span className="bold">Voicing:</span> {song.songVoicing}</p>
                </Row>

                <Row>
                  <p><span className="bold">Instrumentation:</span> {song.songAccompaniment}</p>
                </Row>

                {song.songMajorWork &&
                  <>
                    <p><span className="bold">Movements:</span></p>
                    {song.songMvmtNames.map((title: string) => <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}</p>)}
                  </>}

                {song.songYear &&
                  <Row>
                    <p><span className="bold">Year composed:</span> {song.songYear}</p>
                  </Row>}

                <Row>
                  {song.songSacred === true
                    ? <p className="bold">Sacred</p>
                    : <p className="bold">Secular</p>}
                </Row>

                {song.songSacred &&
                  <Row>
                    <p><span className="bold">Liturgical season:</span> {song.songLiturgy}</p>
                  </Row>}
              </Col>

              {/* TODO: Embed this */}
              {song.songPreview &&
                <Col sm={6}>
                  <Row>
                    <p>{song.songPreview}</p>
                  </Row>
                </Col>}
            </Row>

            {song.songTrack &&
              <Row>
                <p>Demo track:</p>
                <AudioEmbed title={song.songTitle} src={song.songTrack} songId={song._id} />
              </Row>}

            {song.songVideo &&
              <Row>
                <VideoEmbed src={song.songVideo} />
              </Row>
            }

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SongPage;