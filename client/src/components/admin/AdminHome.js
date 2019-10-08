import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as actions from '../../actions';

class AdminHome extends React.Component {
  state = { home: null, editing: null, editingState: null }

  componentDidMount() {
    this.props.fetchHome();
  }

  componentDidUpdate() {
    if (this.props.home) {
      var oldHome = JSON.stringify(this.state.home);
      var newHome = JSON.stringify(this.props.home);
      if (oldHome !== newHome) {
        this.setState({
          home: this.props.home
        });
      }
    }
  }

  handleConfirmClick() {
    this.props.updateHome(this.state.editingState, this.props.adminPassword);
    this.setState({
      editing: null,
      editingState: null
    });
  }

  handleCancelClick() {
    this.setState({
      editing: null,
      editingState: null
    });
  }

  handleInputChange(field, value) {
    this.setState(prevState => {
      var updatedState = prevState.editingState;
      if (field === 'top-title') {
        updatedState.top.title = value;
      } else if (field === 'top-link') {
        updatedState.top.link = value;
      } else {
        updatedState[field] = value;
      }
      return {
        editingState: updatedState
      }
    });
  }

  renderEditContent() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-11">
              <ul className="list-group">
                <li className="list-group-item">
                  <h3 className="mb-3">组织介绍：</h3>
                  <textarea style={{ width: "100%", height: "200px" }} value={this.state.editingState.description} onChange={e => this.handleInputChange('description', e.target.value)} />
                </li>
                <li className="list-group-item">
                  <h3 className="mb-3">今日头条：</h3>
                  <h4 className="mb-2">标题：</h4>
                  <textarea style={{ width: "100%", height: "100px", fontSize: "1.25rem" }} value={this.state.editingState.top.title} onChange={e => this.handleInputChange('top-title', e.target.value)} />
                  <h4 className="mb-2 mt-3">链接：</h4>
                  <input style={{ width: "100%" }} value={this.state.editingState.top.link} onChange={e => this.handleInputChange('top-link', e.target.value)} />
                </li>
              </ul>
            </div>
            <div className="col-1">
              <button className="btn btn-outline-success" style={{ width: "100%", height: "50px" }} onClick={() => { this.handleConfirmClick() }}><i className="material-icons">check</i></button>
              <button className="btn btn-outline-warning" style={{ width: "100%", height: "50px", marginTop: '10px' }} onClick={() => { this.handleCancelClick() }}><i className="material-icons">close</i></button>
            </div>
          </div>
        </li>
      </ul>
    );
  }

  handleEditClick() {
    // window.location.href = "#";
    window.location.href = "#Home";
    this.setState({
      editing: true,
      editingState: _.cloneDeep(this.state.home)
    });
  }

  renderContent() {
    if (this.state.home) {
      return (
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-11">
                <ul className="list-group">
                  <li className="list-group-item">
                    <h3 className="mb-3">组织介绍：</h3>
                    <p>{this.state.home.description}</p>
                  </li>
                  <li className="list-group-item">
                    <h3 className="mb-3">今日头条：</h3>
                    <h4 className="mb-2">标题：</h4>
                    <h5 className="mb-2">{this.state.home.top.title}</h5>
                    <a className="d-flex" href={this.state.home.top.link} target="_blank" rel="noopener noreferrer"><h4 style={{ textDecoration: "underline" }}>链接</h4></a>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <button className="btn btn-outline-dark d-flex justify-content-center align-items-center" style={{ width: "100%", height: "50px" }} onClick={() => { this.handleEditClick() }}><i className="material-icons">edit</i></button>
              </div>
            </div>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.editing ? this.renderEditContent() : this.renderContent()}
      </React.Fragment>
    );
  }
}

function mapStatToProps(state) {
  return {
    home: state.home
  };
}

export default connect(mapStatToProps, actions)(AdminHome);