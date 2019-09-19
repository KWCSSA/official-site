import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Events from './Events';
import Contact from './Contact';

const Admin = () => <h2>Admin</h2>;
const NotFound = () => <h2>404</h2>;

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
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

export default App;