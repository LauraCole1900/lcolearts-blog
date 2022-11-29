import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

interface ErrorProps {
  errmsg: string | undefined;
  btnname: string | undefined;
  show: boolean;
  hide: MouseEventHandler
}


const ErrorModal = (props: ErrorProps): ReactElement => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHead">
          <Modal.Title className="modalTitle"><h2>Post failed</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h3>Post failed</h3>
          

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Close modal and return to form */}
            <Button data-toggle="popover" title="Close" type="button" className="button" onClick={props.hide}>Close</Button>

            {/* Link to Blog page */}
              <Link to={"/"}>
                <Button data-toggle="popover" title="Blog" type="button" className="button">Return to Blog</Button>
              </Link>

          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ErrorModal;