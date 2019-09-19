import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

import '../css/navBar.css';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="white" light expand="md">
          <div className="container">
          <Link className="navbar-brand" to="/"><img className="nav-logo" src="/logo-wide.png" alt="KWCSSA banner" /></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-1 mr-1">
                <Link to="/" className="nav-link">HOME</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/about" className="nav-link">ABOUT</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/events" className="nav-link">EVENTS</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/contact" className="nav-link">CONTACT</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <NavLink href="http://bbs.uwcssa.com">论坛</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}