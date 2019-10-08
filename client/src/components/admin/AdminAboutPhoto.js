import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminAboutPhoto extends React.Component {
  state = { photo: null, editing: null, modal: false, modalImg: null }

  componentDidUpdate() {
    if (this.props.about) {
      var oldPhoto = this.state.photo;
      var newPhoto = this.props.about.photo;
      if (oldPhoto !== newPhoto) {
        this.setState({
          photo: this.props.about.photo
        });
      }
    }
  }

  handleConfirmClick() {
    this.props.updateAboutPhoto(this.state.editing, this.props.adminPassword);
    this.setState({
      editing: null,
    });
  }

  handleCancelClick() {
    this.setState({
      editing: null,
    });
  }

  handleFileSelect = event => {
    const file = event.target.files[0];
    this.setState(prevState => {
      var updatedEvents = prevState.editing;
      try {
        updatedEvents.src = URL.createObjectURL(file);
      } catch (err) {
        return;
      }
      updatedEvents.fileChanged = true;
      updatedEvents.file = file;
      return {
        editing: updatedEvents
      }
    });
  }

  renderEditContent() {
    return (
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <h3>合照：</h3>
          <div className="row">
            <div className="col-11 d-flex flex-column">
              <img className="mb-3" src={this.state.editing.src} alt="Group" style={{ maxWidth: "100%", cursor: "zoom-in" }} onClick={() => this.toggleModal(this.state.editing.src)} />
              <input className="" type="file" accept="image/jpeg" onChange={this.handleFileSelect} />
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
    window.location.href = "#AboutList";
    var editingState = {
      src: this.state.photo,
      file: null,
      fileChanged: false
    }
    this.setState({
      editing: editingState
    });
  }

  toggleModal(src = null) {
    if (src) {
      this.setState({
        modalImg: src
      });
    }
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  renderContent() {
    if (this.state.photo) {
      return (
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <h3>合照：</h3>
            <div className="row">
              <div className="col-11 d-flex flex-column" onClick={() => this.toggleModal(this.state.photo)}>
                <img style={{ maxWidth: "100%", cursor: "zoom-in" }} src={this.state.photo} alt="Group" />
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
      <div>
        <Modal show={this.state.modal} toggle={() => this.toggleModal()} src={this.state.modalImg} />
        {this.state.editing ? this.renderEditContent() : this.renderContent()}
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStatToProps, actions)(AdminAboutPhoto);