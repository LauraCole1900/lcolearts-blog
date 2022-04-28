import React, { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

interface SuccessProps {
  show: boolean
  hide: MouseEventHandler
}


const SuccessModal = (props: SuccessProps): ReactElement => {

  const urlArray: string[] = window.location.href.split("/");
  const urlWhere: string | undefined = urlArray.at(-1);


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>Success!</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h3>Your post was created. Or deleted. Or possibly updated. Whichever.</h3>


          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Link to Blog */}
            {(urlWhere !== "lcolearts-blog.herokuapp.com" && urlWhere !== "")
              ? <Link to="/">
                <Button data-toggle="popover" title="Blog" type="button" className="button">Return to Blog</Button>
              </Link>
              : <Button data-toggle="popover" title="Blog" type="button" className="button" onClick={props.hide}>Return to Blog</Button>}

          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuccessModal;