import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Nav, Navbar, NavDropdown, Form, Button } from "react-bootstrap//";
import React from "react";

const NavbarComponent = () => {
  return (
    <Navbar expand="xl" variant="dark" className="primary">
      <Container>
        <Navbar.Brand
          href="#home"
          className="fs-3 mr-10"
          style={{ fontStyle: "italic" }}
        >
          Kasir App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
