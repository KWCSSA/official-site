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

  navBarClick(route) {
    if (window.location.pathname === route) {
      this.props.scroll.scrollToTop();
    } else {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
        <Navbar color="white" className="fixed-top shadow-sm" light expand="md">
          <div className="container">
          <Link className="navbar-brand" to="/" onClick={() => this.navBarClick('/')}><img className="nav-logo" src="/logo-wide.png" alt="KWCSSA banner" /></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-1 mr-1">
                <Link to="/" className="nav-link" onClick={() => this.navBarClick('/')}>HOME</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/about" className="nav-link" onClick={() => this.navBarClick('/about')}>ABOUT</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/events" className="nav-link" onClick={() => this.navBarClick('/events')}>EVENTS</Link>
              </NavItem>
              <NavItem className="ml-1 mr-1">
                <Link to="/contact" className="nav-link" onClick={() => this.navBarClick('/contact')}>CONTACT</Link>
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