import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

const LandingPage = (): ReactElement => {
  return (
    <Container>
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          <h1 className="landerHead">Welcome! Where would you like to go?</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 2, offset: 4 }}>
          <Link to="/blog"><Button data-toggle="popover" title="Blog" className="button btn btn404">My Blog</Button></Link>
        </Col>
        <Col sm={2}>
          <Link to="/music"><Button data-toggle="popover" title="Compositions" className="button btn btn404">My Compositions</Button></Link>
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage;