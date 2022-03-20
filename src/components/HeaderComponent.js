import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";
import logo from "../images/TBC-Logo-short.svg";


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    alert(
      `Username: ${this.username.value} Password: ${this.password
        .value} Remember: ${this.remember.checked}`
    );
    this.toggleModal();
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark sticky="top" expand="md" className="header-navbar">
          <div className="container">
            <NavbarBrand className="mr-auto" href="#"><img src={logo} className="header-img" alt="Torres Burger Co." /></NavbarBrand>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <a className="nav-link" href="#sec1">
                    <i className="fa fa-list fa-lg" /> Menu
                  </a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#sec2">
                    <i className="fa fa-info fa-lg" /> Location
                  </a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#sec3">
                    <i className="fa fa-info fa-lg" /> Request
                  </a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#sec4">
                    <i className="fa fa-info fa-lg" /> About Us
                  </a>
                </NavItem>
                <NavItem>
                  <a className="nav-link" href="#">
                    <i className="fa fa-info fa-lg" /> Back to top
                  </a>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
