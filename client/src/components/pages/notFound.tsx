import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";


const NotFound = (): ReactElement => {


  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <h1>404 Not Found</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <p>You've discovered uncharted territory! Return to familiar areas here:</p>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 1 }}>
            <a href="https://lcolearts.com/">
              <Button data-toggle="popover" title="Home" className="button btn btn404">Home</Button>
            </a>
            <a href="https://lcolearts.com/#/about">
              <Button data-toggle="popover" title="About" className="button btn btn404">About</Button>
            </a>
            <a href="https://lcolearts.com/#/webdev">
              <Button data-toggle="popover" title="Webdev Portfolio" className="button btn btn404">Webdev Portfolio</Button>
            </a>
            <a href="https://lcolearts.com/#/musician">
              <Button data-toggle="popover" title="Musician" className="button btn btn404">Music CV</Button>
            </a>
            <Link to="/music">
              <Button data-toggle="popover" title="Compositions" className="button btn btn404">Compositions</Button>
            </Link>
            <a href="https://lcolearts.com/#/martial_artist">
              <Button data-toggle="popover" title="Martial Artist" className="button btn btn404">Martial Artist</Button>
            </a>
            <Link to="/blog">
              <Button data-toggle="popover" title="Blog" className="button btn btn404">Blog</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NotFound;