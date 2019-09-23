import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Root from './Root';

const Admin = () => <h2>Admin</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchEvent();
    this.props.fetchAbout();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin" component={Admin} />
            <Route path="/" component={Root} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);