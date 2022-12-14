import { ReactElement } from "react";
import { Params, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-bootstrap";
import { QUERY_ONE_SONG } from "../../utils/gql";
import { Song } from "../../utils/interfaces";
import { AudioEmbed, VideoEmbed } from "../embed";


const SongPage = (): ReactElement => {

  const params: Readonly<Params<string>> = useParams<string>();

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
                    {song.songMvmtNames.map((title: string, i: number) => <p key={`${song._id}${i}`} className="mvmtNames">{title}</p>)}
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
                <Col sm={{ span: 6, offset: 6 }}>
                  <Row>
                    <object data={song.songPreview} type="application/pdf" width="100%" height="100%">
                      <p>Alternative text - include a link <a href={song.songPreview}>to the PDF!</a></p>
                    </object>
                  </Row>
                </Col>}

              {/* TODO: And this */}
              {song.songMvmtPreviews[0] &&
                (song.songMvmtPreviews.map((preview: string, i: number): ReactElement =>
                  <div key={`${i}${song._id}`}>
                    <p>{song.songMvmtNames[i]} preview:</p>
                    <object data={preview} type="application/pdf" width="100%" height="100%">
                      <p>Alternative text - include a link <a href={preview}>to the PDF!</a></p>
                    </object>
                  </div>
                ))
              }
            </Row>

            {song.songTrack &&
              <Row>
                <p>Demo track:</p>
                <AudioEmbed title={song.songTitle} src={song.songTrack} songId={song._id} />
              </Row>}

            {song.songMvmtTracks[0] &&
              (song.songMvmtTracks.map((track: string, i: number): ReactElement =>
                <div key={song._id}>
                  <p>{song.songMvmtNames[i]} demo track:</p>
                  <AudioEmbed title={song.songMvmtNames[i]} src={track} songId={song._id} />
                </div>
              ))
            }

            {song.songVideo &&
              <Row className="centered">
                <VideoEmbed src={song.songVideo} title={song.songTitle} />
              </Row>
            }

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SongPage;