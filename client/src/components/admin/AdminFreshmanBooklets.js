import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminFreshmanMessage extends React.Component {
  state = { newStudentBooklet: null, safetyBooklet: null, editing: null, editingState: null, modal: false, modalImg: null }

  componentDidUpdate() {
    if (this.props.freshman) {
      var oldNSBooklet = JSON.stringify(this.state.newStudentBooklet);
      var newNSBooklet = JSON.stringify(this.props.freshman.newStudentBooklet);
      var oldSFBooklet = JSON.stringify(this.state.safetyBooklet);
      var newSFBooklet = JSON.stringify(this.props.freshman.safetyBooklet);
      if (oldNSBooklet !== newNSBooklet || oldSFBooklet !== newSFBooklet) {
        this.setState({
          newStudentBooklet: this.props.freshman.newStudentBooklet,
          safetyBooklet: this.props.freshman.safetyBooklet
        });
      }
    }
  }

  handleConfirmClick() {
    this.props.updateFreshmanBooklets(this.state.editingState);
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

  handlePicFileSelect = (target, file) => {
    this.setState(prevState => {
      var updatedState = null;
      if (this.state.editing) {
        updatedState = prevState.editingState;
      }
      var pic = null;
      try {
        pic = URL.createObjectURL(file);
      } catch (err) {
        return;
      }
      if (target === 'NSBooklet') {
        updatedState.newStudentBooklet.pic = pic;
        updatedState.NSPicChanged = true;
        updatedState.NSPic = file;
      } else if (target === 'SFBooklet') {
        updatedState.safetyBooklet.pic = pic;
        updatedState.SFPicChanged = true;
        updatedState.SFPic = file;
      }
      return {
        editingState: updatedState
      }
    });
  }

  handlePdfFileSelect = (target, file) => {
    this.setState(prevState => {
      var updatedState = null;
      if (this.state.editing) {
        updatedState = prevState.editingState;
      }
      if (target === 'NSBooklet') {
        updatedState.NSPdfChanged = true;
        updatedState.NSPdf = file;
      } else if (target === 'SFBooklet') {
        updatedState.SFPdfChanged = true;
        updatedState.SFPdf = file;
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
              <div className="list-group-item d-flex flex-column">
                <h4>新生手册：</h4>
                <img className="mb-3" src={this.state.editingState.newStudentBooklet.pic} style={{ width: "50%", cursor: "zoom-in" }} alt="" onClick={() => this.toggleModal(this.state.editingState.newStudentBooklet.pic)} />
                <h5>封面：</h5>
                <input className="mb-3" type="file" accept="image/jpeg" onChange={e => this.handlePicFileSelect('NSBooklet', e.target.files[0])} />
                <h5>PDF文件：</h5>
                <input className="mb-3" type="file" accept="application/pdf" onChange={e => this.handlePdfFileSelect('NSBooklet', e.target.files[0])} />
              </div>
              <div className="list-group-item d-flex flex-column">
                <h4>安全手册：</h4>
                <img className="mb-3" src={this.state.editingState.safetyBooklet.pic} style={{ width: "50%", cursor: "zoom-in" }} alt="" onClick={() => this.toggleModal(this.state.editingState.safetyBooklet.pic)} />
                <h5>封面：</h5>
                <input className="mb-3" type="file" accept="image/jpeg" onChange={e => this.handlePicFileSelect('SFBooklet', e.target.files[0])} />
                <h5>PDF文件：</h5>
                <input className="mb-3" type="file" accept="application/pdf" onChange={e => this.handlePdfFileSelect('SFBooklet', e.target.files[0])} />
              </div>
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
    window.location.href = "#FreshmanBooklets";
    this.setState({
      editing: true,
      editingState: {
        newStudentBooklet: this.state.newStudentBooklet,
        safetyBooklet: this.state.safetyBooklet,
        NSPicChanged: false,
        NSPic: null,
        NSPdfChanged: false,
        NSPdf: null,
        SFPicChanged: false,
        SFPic: null,
        SFPdfChanged: false,
        SFPdf: null
      }
    });
  }

  renderContent() {
    if (this.state.newStudentBooklet) {
      return (
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-5">
                <h4>新生手册：</h4>
                <img src={this.state.newStudentBooklet.pic} style={{ width: "80%", cursor: "zoom-in" }} alt="" onClick={() => this.toggleModal(this.state.newStudentBooklet.pic)} />
                <a className="d-flex" href={this.state.newStudentBooklet.link} target="_blank" rel="noopener noreferrer"><h4 style={{ textDecoration: "underline" }}>链接</h4></a>
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <h4>安全手册：</h4>
                <img src={this.state.safetyBooklet.pic} style={{ width: "80%", cursor: "zoom-in" }} alt="" onClick={() => this.toggleModal(this.state.safetyBooklet.pic)} />
                <a className="d-flex" href={this.state.safetyBooklet.link} target="_blank" rel="noopener noreferrer"><h4 style={{ textDecoration: "underline" }}>链接</h4></a>
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

  render() {
    return (
      <React.Fragment>
        <Modal show={this.state.modal} toggle={() => this.toggleModal()} src={this.state.modalImg} />
        {this.state.editing ? this.renderEditContent() : this.renderContent()}
      </React.Fragment>
    );
  }
}

function mapStatToProps(state) {
  return {
    freshman: state.freshman
  };
}

export default connect(mapStatToProps, actions)(AdminFreshmanMessage);