import React from 'react';
import { connect } from 'react-redux';

import '../../css/admin.css';

import * as actions from '../../actions';

import AdminEventList from './AdminEventList';
import AdminEventBanners from './AdminEventBanners';
import AdminAboutList from './AdminAboutList';
import AdminHome from './AdminHome';
import AdminAboutPhoto from './AdminAboutPhoto';
import AdminFreshmanMessage from './AdminFreshmanMessage';
import AdminFreshmanBooklets from './AdminFreshmanBooklets';
import AdminFreshmanList from './AdminFreshmanList';

class Admin extends React.Component {
  state = { password: '', init: true, message: '' };

  componentDidUpdate() {
    if (!this.state.init && !this.props.admin.auth) {
      if (this.state.message !== '密码错误') {
        this.setState({
          message: '密码错误'
        })
      }
    }
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.adminLogin(this.state.password);
    this.setState({
      init: false
    });
  }

  renderLogin() {
    return (
      <div className="admin-login">
        <form onSubmit={this.handleLogin.bind(this)}>
          <div className="form-group">
            <input type="password" name="password" className="form-control" aria-describedby="password" onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} />
            <label className="text-danger">{this.state.message}</label>
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
          <button className="btn btn-outline-dark" style={{marginTop: "5px"}} onClick={() => {window.location.href = "#Events";}}>Events</button>
          <button className="btn btn-outline-dark" style={{marginTop: "5px"}} onClick={() => {window.location.href = "#AboutList";}}>About</button>
          <button className="btn btn-outline-dark" style={{marginTop: "5px"}} onClick={() => {window.location.href = "#Freshman";}}>新生相关</button>
        </div>
        <div id="Home" className="sections mb-5">
          <h1 className="mt-3 mb-3">Home</h1>
          <AdminHome />
        </div>
        <div id="Events" className="sections mb-5">
          <h1 className="mt-3 mb-3">Events</h1>
          <h3 id="EventBanners">EventBanners</h3>
          <AdminEventBanners />
          <h3 id="EventList" className="mt-3">EventList</h3>
          <AdminEventList />
        </div>
        <div id="AboutList" className="sections">
          <h1 className="mt-3 mb-3">About</h1>
          <AdminAboutPhoto />
          <AdminAboutList />
        </div>
        <div id="Freshman" className="sections mt-5">
          <h1 className="mt-3 mb-3">新生相关</h1>
          <h3 id="FreshmanMessage" className="mt-3">新生寄语</h3>
          <AdminFreshmanMessage />
          <h3 id="FreshmanBooklets" className="mt-3">新生手册&安全手册</h3>
          <AdminFreshmanBooklets />
          <h3 id="FreshmanList" className="mt-3">新生必读</h3>
          <AdminFreshmanList />
        </div>
        <div style={{marginTop: "100px"}}></div>
      </div>
    );
  }

  render() {
    return this.props.admin.auth ? this.renderAdminComponents() : this.renderLogin();
    // return this.renderAdminComponents()
  }
}

function mapStatToProps(state) {
  return {
    admin: state.admin
  };
}

export default connect(mapStatToProps, actions)(Admin);