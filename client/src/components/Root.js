import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Scroll from 'react-scroll';

import NavBar from './NavBar';
import Home from './home/Home';
import About from './about/About';
import Events from './events/Events';
import Contact from './Contact';
import Footer from './Footer';

const NotFound = () => <h2 style={{marginTop: "200px"}}>404</h2>;

var scroll = Scroll.animateScroll;

export default () => {
  return (
    <React.Fragment>
      <NavBar scroll={scroll} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}