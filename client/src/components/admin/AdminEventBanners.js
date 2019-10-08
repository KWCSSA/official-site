import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminEventBanners extends React.Component {
  state = { banners: [], editing: null, editingState: null, adding: null, addingState: null, modal: false, modalImg: null }

  componentDidUpdate() {
    if (this.props.event) {
      var oldBanners = JSON.stringify(this.state.banners);
      var newBanners = JSON.stringify(this.props.event.banners);
      if (oldBanners !== newBanners) {
        this.setState({
          banners: this.props.event.banners
        });
      }
    }
  }

  handleAddClick() {
    window.location.href = "#EventBanners";
    this.setState({
      adding: true,
      addingState: {
        link: '',
        pic: {}
      }
    })
  }

  handleEditClick(id) {
    window.location.href = "#EventBanners";
    this.setState({
      editing: id,
      editingState: _.cloneDeep(this.state.banners.filter(element => element.id === id)[0])
    });
  }

  handleDeleteClick(id) {
    this.props.deleteBanner(id, this.props.adminPassword);
    this.setState(prevState => {
      return {
        banners: prevState.banners.filter(element => element.id !== id)
      }
    })
  }

  handleConfirmClick() {
    if (this.state.editing) {
      this.props.updateBannerDetail(this.state.editingState, this.props.adminPassword);
    } else if (this.state.adding) {
      this.props.addNewBanner(this.state.addingState, this.props.adminPassword);
    }
    this.setState({
      editing: null,
      editingState: null,
      adding: null,
      addingState: null
    });
  }

  handleCancelClick() {
    this.setState({
      editing: null,
      editingState: null,
      adding: null,
      addingState: null
    });
  }

  handleInputChange(value) {
    if (this.state.editing) {
      this.setState(prevState => {
        var editingState = prevState.editingState;
        editingState.link = value;
        return {
          editingState
        };
      });
    } else if (this.state.adding) {
      this.setState(prevState => {
        var addingState = prevState.addingState;
        addingState.link = value;
        return {
          addingState
        };
      });
    }
  }

  handleFileSelect = (file, version) => {
    this.setState(prevState => {
      var updatedBanner = null;
      if (this.state.editing) {
        updatedBanner = prevState.editingState;
      } else if (this.state.adding) {
        updatedBanner = prevState.addingState;
      }
      try {
        updatedBanner.pic[version] = URL.createObjectURL(file);
      } catch (err) {
        return;
      }
      if (!updatedBanner.fileChanged) {
        updatedBanner.fileChanged = {}
      }
      updatedBanner.fileChanged[version] = true;
      if (!updatedBanner.file) {
        updatedBanner.file = {}
      }
      updatedBanner.file[version] = file;
      if (this.state.editing) {
        return {
          editingState: updatedBanner
        }
      } else if (this.state.adding) {
        return {
          addingState: updatedBanner
        }
      }
    });
  }

  renderAdd() {
    var banner = this.state.addingState;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-11">
              <div className="row">
                <div className="col">
                  <h4>Banner:</h4>
                  <div onClick={() => this.toggleModal(banner.pic.b)} style={{ cursor: "zoom-in" }}><img src={banner.pic ? banner.pic.b : ''} style={{ width: '100%' }} alt="" /></div>
                  <input className="mt-2 mb-2" type="file" accept="image/jpeg" onChange={e => this.handleFileSelect(e.target.files[0], 'b')} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4>Poster:</h4>
                  <div onClick={() => this.toggleModal(banner.pic.p)} style={{ cursor: "zoom-in" }}><img src={banner.pic ? banner.pic.p : ''} style={{ width: '50%' }} alt="" /></div>
                  <input className="mt-2 mb-2" type="file" accept="image/jpeg" onChange={e => this.handleFileSelect(e.target.files[0], 'p')} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4 className="mb-2 mt-3">链接：</h4>
                  <input style={{ width: "100%" }} value={this.state.addingState.link} onChange={e => this.handleInputChange(e.target.value)} />
                </div>
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

  renderEdit() {
    var banner = this.state.editingState;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-11">
              <div className="row">
                <div className="col">
                  <h4>Banner:</h4>
                  <div onClick={() => this.toggleModal(banner.pic.b)} style={{ cursor: "zoom-in" }}><img src={banner.pic ? banner.pic.b : ''} style={{ width: '100%' }} alt="" /></div>
                  <input className="mt-2 mb-2" type="file" accept="image/jpeg" onChange={e => this.handleFileSelect(e.target.files[0], 'b')} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4>Poster:</h4>
                  <div onClick={() => this.toggleModal(banner.pic.p)} style={{ cursor: "zoom-in" }}><img src={banner.pic ? banner.pic.p : ''} style={{ width: '50%' }} alt="" /></div>
                  <input className="mt-2 mb-2" type="file" accept="image/jpeg" onChange={e => this.handleFileSelect(e.target.files[0], 'p')} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4 className="mb-2 mt-3">链接：</h4>
                  <input style={{ width: "100%" }} value={this.state.editingState.link} onChange={e => this.handleInputChange(e.target.value)} />
                </div>
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

  renderContent() {
    if (this.state.editing) {
      return this.renderEdit();
    } else if (this.state.adding) {
      return this.renderAdd();
    } else {
      return (
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-center"><button className="btn btn-success w-25" onClick={() => this.handleAddClick()}><i className="material-icons">add</i></button></li>
          {this.state.banners.map(banner => {
            return (
              <li className="list-group-item" key={banner.id}>
                <div className="row">
                  <div className="col-8" onClick={() => this.toggleModal(banner.pic.b)} style={{ cursor: "zoom-in" }}>
                    <img src={banner.pic.b} style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="col-2" onClick={() => this.toggleModal(banner.pic.p)} style={{ cursor: "zoom-in" }}>
                    <img src={banner.pic.p} style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <a className="d-flex" href={banner.link} target="_blank" rel="noopener noreferrer"><h4 style={{ textDecoration: "underline" }}>链接</h4></a>
                  </div>
                  <div className="col-1">
                    <button className="btn btn-outline-dark d-flex justify-content-center align-items-center" style={{ width: "100%", height: "50px" }} onClick={() => { this.handleEditClick(banner.id) }}><i className="material-icons">edit</i></button>
                    <button className="btn btn-outline-danger d-flex justify-content-center align-items-center" style={{ width: "100%", height: "50px", marginTop: '10px' }} onClick={() => { this.handleDeleteClick(banner.id) }}><i className="material-icons">delete_forever</i></button>
                  </div>
                </div>
              </li>
            );
          })}
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
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps, actions)(AdminEventBanners);