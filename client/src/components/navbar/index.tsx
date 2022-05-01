import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Auth from "../../utils/auth";
import "./style.css";


const Navigation = (): ReactElement => {


  return (
    <Navbar expand="sm" className="navbar">
      <Navbar.Brand>
        <a href="https://lcolearts.com/#/about" className="mylogo">
          Laura Cole
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <a href="https://lcolearts.com/#/" className="navlink">
            Home
          </a>
          <a href="https://lcolearts.com/#/about" className="navlink">
            About
          </a>
          <a href="https://lcolearts.com/#/webdev" className="navlink">
            Webdev
          </a>
          <a href="https://lcolearts.com/#/musician" className="navlink">
            Musician
          </a>
          <a href="https://lcolearts.com/#/martial_artist" className="navlink">
            Martial Artist
          </a>
          <Link to="/" className="navlink">
            Blog
          </Link>
          <a href="https://lcolearts.com/#/contact" className="navlink">
            Contact Me
          </a>
          {Auth.loggedIn() &&
            <>
              <Link to="/new_post" className="navlink">New Post</Link>
              <Nav.Link onClick={Auth.logout} className="navlink">Logout</Nav.Link>
            </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;