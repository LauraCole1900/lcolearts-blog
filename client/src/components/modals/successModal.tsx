import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";


const SuccessModal = (props: any): ReactElement => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>Success!</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
            <h3>Your post was created.</h3>


          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Link to Blog */}
              <Link to={"/"}>
                <Button data-toggle="popover" title="Blog" type="button" className="button">Return to Blog</Button>
              </Link>

          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuccessModal;