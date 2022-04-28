import { MouseEventHandler, ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

interface ConfirmProps {
  show: boolean
  hide: MouseEventHandler
  entryDelete: MouseEventHandler
}


const ConfirmModal = (props: ConfirmProps): ReactElement => {


  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Header className="modalHeadConf">
          <Modal.Title className="modalTitle"><h2>Please confirm</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">

          {/* Delete Post button */}
          <p>Are you sure you want to delete this post? This action can't be undone.</p>

          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Confirm Delete Post button */}
            <Button data-toggle="popover" title="Confirm Delete" className="button" type="button" onClick={props.entryDelete}>Yes, Delete Post</Button>

            {/* No, take no action button */}
            <Button data-toggle="popover" title="No" className="button" type="button" onClick={props.hide}>No, take me back</Button>

          </Modal.Footer>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ConfirmModal;