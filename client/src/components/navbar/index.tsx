import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "./style.css";

const Navigation = (): ReactElement => {
  

  return (
    <Navbar expand="sm" className="navbar">
      <Navbar.Brand>
        <Link to="https://lcolearts.com/#/about" className="mylogo">
          Laura Cole
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Link to="https://lcolearts.com/#/" className="navlink">
            Home
          </Link>
          <Link to="https://lcolearts.com/#/about" className="navlink">
            About
          </Link>
          <Link to="https://lcolearts.com/#/webdev" className="navlink">
            Webdev
          </Link>
          <Link to="https://lcolearts.com/#/musician" className="navlink">
            Musician
          </Link>
          <Link to="https://lcolearts.com/#/martial_artist" className="navlink">
            Martial Artist
          </Link>
          <Link to="https://lcolearts-blog.herokuapp.com/" className="navlink">
            Blog
          </Link>
          <Link to="https://lcolearts.com/#/contact" className="navlink">
            Contact Me
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default Navigation;