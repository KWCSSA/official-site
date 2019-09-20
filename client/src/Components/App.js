import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as actions from '../actions';

import NavBar from './NavBar';
import Home from './home/Home';
import About from './About';
import Events from './Events';
import Contact from './Contact';

const Admin = () => <h2>Admin</h2>;
const NotFound = () => <h2>404</h2>;

var scroll = Scroll.animateScroll;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchHighlightEvent();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar scroll={scroll} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);