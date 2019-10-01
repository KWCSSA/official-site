import React from 'react';
import { connect } from 'react-redux';

import '../../css/admin.css';

import * as actions from '../../actions';

import AdminEventList from './AdminEventList';
import AdminAboutList from './AdminAboutList';
import AdminHome from './AdminHome';
import AdminAboutPhoto from './AdminAboutPhoto';

class Admin extends React.Component {
  state = { password: '', authed: false };

  componentDidUpdate() {
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.adminLogin(this.state.password);
  }

  renderLogin() {
    return (
      <div className="admin-login">
        <form onSubmit={this.handleLogin.bind(this)}>
          <div className="form-group">
            <input type="password" name="password" className="form-control" aria-describedby="password" onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} />
          </div>
        </form>
      </div>
    );
  }

  renderAdminComponents() {
    return (
      <div className="container">
        <div className="sidebar">
          <button className="btn btn-outline-dark" onClick={() => {window.location.href = "#Home";}}>Home</button>
          <button className="btn btn-outline-dark" style={{marginTop: "5px"}} onClick={() => {window.location.href = "#EventList";}}>Events</button>
          <button className="btn btn-outline-dark" style={{marginTop: "5px"}} onClick={() => {window.location.href = "#AboutList";}}>About</button>
        </div>
        <div id="Home" className="sections mb-5">
          <h1 className="mt-3 mb-3">Home</h1>
          <AdminHome />
        </div>
        <div id="EventList" className="sections mb-5">
          <h1 className="mt-3 mb-3">Events</h1>
          <AdminEventList />
        </div>
        <div id="AboutList" className="sections">
          <h1 className="mt-3 mb-3">About</h1>
          <AdminAboutPhoto />
          <AdminAboutList />
        </div>
        <div style={{marginTop: "100px"}}></div>
      </div>
    );
  }

  render() {
    // return this.props.admin.auth ? this.renderAdminComponents() : this.renderLogin();
    return this.renderAdminComponents()
  }
}

function mapStatToProps(state) {
  return {
    admin: state.admin
  };
}

export default connect(mapStatToProps, actions)(Admin);