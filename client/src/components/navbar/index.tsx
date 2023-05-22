import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
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
          <NavDropdown title="Musician">
            <NavDropdown.Item href="https://lcolearts.com/#/musician" className="navlink">C.V.</NavDropdown.Item>
            <NavDropdown.Item href="/music/page/1" className="navlink" rel="noreferred noopener">Compositions</NavDropdown.Item>
          </NavDropdown>
          <a href="https://lcolearts.com/#/martial_artist" className="navlink">
            Martial Artist
          </a>
          <Link to="/blog/page/1" className="navlink">
            Blog
          </Link>
          <a href="https://lcolearts.com/#/fun_and_games" className="navlink">
            Fun & Games
          </a>
          {/* <a href="https://lcolearts.com/#/contact" className="navlink">
            Contact Me
          </a> */}
          {Auth.loggedIn() &&
            <>
              <Link to="/new_post" className="navlink">New Post</Link>
              <Link to="/new_song" className="navlink">New Song</Link>
              <Nav.Link onClick={Auth.logout} className="navlink">Logout</Nav.Link>
            </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;