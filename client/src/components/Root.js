import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Scroll from 'react-scroll';

import NavBar from './NavBar';
import Home from './home/Home';
import About from './about/About';
import Freshman from './freshman/Freshman';
import Events from './events/Events';
import Contact from './contact/Contact';
import Footer from './Footer';
import NotFound404 from './NotFound404';

var scroll = Scroll.animateScroll;

class Root extends React.Component {
  componentDidMount() {
    this.props.fetchEvent();
    this.props.fetchAbout();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar scroll={scroll} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/freshman" component={Freshman} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound404} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(null, actions)(Root);