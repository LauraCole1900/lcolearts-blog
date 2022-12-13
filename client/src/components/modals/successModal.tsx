import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

interface SuccessProps {
  btnname: string | undefined;
  params: [] | undefined;
  show: boolean;
  hide: MouseEventHandler;
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
          <h3>Your thing was created. Or deleted. Or possibly updated. Whatevs.</h3>


          {/* Navigation buttons */}
          <Modal.Footer className="modalFooter">

            {/* Link to Blog */}
            {urlWhere !== "blog"
              ? <Link to="/blog">
                <Button data-toggle="popover" title="Blog" type="button" className="button">Blog</Button>
              </Link>
              : <Button data-toggle="popover" title="Blog" type="button" className="button" onClick={props.hide}>Blog</Button>}

            {/* Link to Compositions */}
            {urlWhere !== "music"
              ? <Link to="/music">
                <Button data-toggle="popover" title="Compositions" type="button" className="button">Compositions</Button>
              </Link>
              : <Button data-toggle="popover" title="Compositions" type="button" className="button" onClick={props.hide}>Compositions</Button>}


          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuccessModal;