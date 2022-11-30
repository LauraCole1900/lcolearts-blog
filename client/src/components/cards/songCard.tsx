import { MouseEvent, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Auth from "../../utils/auth";
import { Song } from "../../utils/interfaces";
import "./style.css";


interface MusicCardProps {
  setEntryId: Function
  handleShowConfirm: Function
  entries: Song[]
  handleKeyword: Function
}

const SongCard = (props: MusicCardProps): ReactElement => {

  const handleDeleteClick = (id: string): void => {
    props.setEntryId(id);
    props.handleShowConfirm();
  };


  return (
    <>
      {props.entries?.map((song: Song): ReactElement => (
        <Card key={song!._id!.toString()}>
          <Card.Header className="songHeader">
            <div>
              <Link to={`/music/${song._id}`} className="songLink">
                <h1>{song!.songTitle}</h1>
              </Link>
              <p>Voicing: {song.songVoicing}</p>
            </div>
            {Auth.loggedIn() &&
              <div>
                <Link to={`/edit_song/${song._id}`} className="navlink">
                  <Button className="btn cardBtn">
                    <p>Edit</p>
                  </Button>
                </Link>
                <Button className="btn cardBtn" data-id={song._id} onClick={(): void => handleDeleteClick(song._id!)}>
                  <p>Delete</p>
                </Button>
              </div>}
          </Card.Header>
          <Card.Body className="songBody">
            <p className="tags">Accompaniment: {song.songAccompaniment}</p>
            {song.songSacred
              ? <>
                <p>Sacred</p>
                <p>{song.songLiturgy}</p>
              </>
              : <p>Secular</p>}
            {song.songTrack &&
              <p>Demo track: {song.songTrack}</p>}
            {song.songPreview &&
              <p>Preview: {song.songPreview}</p>}
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default SongCard;