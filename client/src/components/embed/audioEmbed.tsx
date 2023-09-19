import { ReactElement } from "react";
import { Row } from "react-bootstrap"
import PropTypes from "prop-types";

const AudioEmbed = ({ title, src, songId }: { title: string; src: string; songId: string | undefined }): ReactElement => {

  return (
    <>
      <Row className="audio-responsive" >
        <audio controls>
          <source src={src}
            title={title}
            type="audio/mp3"
            id={songId} />
        </audio>
      </Row>
    </>
  )
};

AudioEmbed.propTypes = {
  src: PropTypes.string.isRequired
};

export default AudioEmbed;