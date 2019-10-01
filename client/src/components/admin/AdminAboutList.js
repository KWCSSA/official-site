import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import * as _ from 'lodash';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminAboutList extends React.Component {
  state = { about: [], updated: false, editing: null, editingState: null, adding: false, addingState: null, modal: false, modalImg: null }

  componentDidMount() {
    this.props.fetchAbout();
  }

  componentDidUpdate() {
    // console.log('update', this.state);
    if (this.props.about) {
      var oldEvents = JSON.stringify(this.state.about);
      var newEvents = JSON.stringify(this.props.about.people);
      if (oldEvents !== newEvents) {
        this.setState({
          about: this.props.about.people
        });
      }
    }
    if (this.state.updated) {
      this.props.updateAboutList(this.state.about);
      this.setState({
        updated: false
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(prevState => {
      return {
        about: arrayMove(prevState.about, oldIndex, newIndex),
        updated: true
      };
    });
  };

  handleEditClick(id) {
    // window.location.href = "#";
    window.location.href = "#AboutPeople";
    this.setState({
      editing: id,
      editingState: _.cloneDeep(this.state.about.filter(element => element.id === id)[0])
    });
  }

  handleDeleteClick(id) {
    this.props.deleteAbout(id);
    this.setState(prevState => {
      return {
        about: prevState.about.filter(element => element.id !== id)
      }
    });
  }

  renderAbout() {
    const DragHandle = SortableHandle(() => (<div className="h-100 w-100 d-flex justify-content-center align-items-center drag-handle"><i className="material-icons">drag_handle</i></div>));

    const renderAboutItem = person => {
      return (
        <div className="row">
          <div className="col-1">
            <DragHandle />
          </div>
          <div className="col-2" onClick={() => this.toggleModal(person.pic)}>
            <img style={{ maxWidth: "100%", cursor: "pointer" }} src={person.pic} alt={person.name} />
          </div>
          <div className="col-8 d-flex flex-column">
            <div>
              <h3>{person.position}</h3>
            </div>
            <div>
              <h4>{person.name}</h4>
            </div>
            <div>
              <p>{person.description}</p>
            </div>
          </div>
          <div className="col-1">
            <button className="btn btn-outline-dark d-flex justify-content-center align-items-center" style={{ width: "100%", height: "50px" }} onClick={() => { this.handleEditClick(person.id) }}><i className="material-icons">edit</i></button>
            <button className="btn btn-outline-danger d-flex justify-content-center align-items-center" style={{ width: "100%", height: "50px", marginTop: '10px' }} onClick={() => { this.handleDeleteClick(person.id) }}><i className="material-icons">delete_forever</i></button>
          </div>
        </div>
      );
    };

    const SortableEventItem = SortableElement(({ value }) => <li className="list-group-item">{renderAboutItem(value)}</li>);

    const SortableEventList = SortableContainer(({ items }) => {
      return (
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-center"><button className="btn btn-success w-25" onClick={() => this.handleAddClick()}><i className="material-icons">add</i></button></li>
          {items.map((value, index) => (
            <SortableEventItem key={`item-${index}`} index={index} value={value} />
          ))}
        </ul>
      );
    });

    return <SortableEventList items={this.state.about} onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis="y" />;
  }

  handleConfirmClick() {
    if (this.state.adding) {
      // this.props.updateEventDetail(this.state.editingState);
      this.props.addNewAbout(this.state.addingState);
      this.setState({
        adding: null,
        addingState: null
      });
    } else if (this.state.editing) {
      this.props.updateAboutDetail(this.state.editingState);
      this.setState({
        editing: null,
        editingState: null
      });
    }
  }

  handleCancelClick() {
    this.setState({
      editing: null,
      editingState: null,
      adding: null,
      addingState: null
    });
  }

  handleAddClick() {
    window.location.href = "#AboutPeople";
    this.setState({
      adding: true,
      addingState: {
        name: '',
        position: '',
        description: '',
        pic: null
      }
    })
  }

  handleInputChange(field, value) {
    this.setState(prevState => {
      var updatedEvents = null;
      if (this.state.editing) {
        updatedEvents = prevState.editingState;
      } else if (this.state.adding) {
        updatedEvents = prevState.addingState;
      }
      updatedEvents[field] = value;
      if (this.state.editing) {
        return {
          addingState: updatedEvents
        }
      } else if (this.state.adding) {
        return {
          editingState: updatedEvents
        }
      }
    });
  }

  handleFileSelect = event => {
    const file = event.target.files[0];
    this.setState(prevState => {
      var updatedEvents = null;
      if (this.state.editing) {
        updatedEvents = prevState.editingState;
      } else if (this.state.adding) {
        updatedEvents = prevState.addingState;
      }
      try {
        updatedEvents.pic = URL.createObjectURL(file);
      } catch (err) {
        return;
      }
      updatedEvents.fileChanged = true;
      updatedEvents.file = file;
      if (this.state.editing) {
        return {
          editingState: updatedEvents
        }
      } else if (this.state.adding) {
        return {
          addingState: updatedEvents
        }
      }
    });
  }

  renderEdit() {
    var person = this.state.editingState;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10 d-flex flex-column">
              <div className="d-flex flex-column">
                <h4>照片:</h4>
                <div className="mt-3 mb-3" style={{ height: "500px" }}><img style={{ maxHeight: "100%" }} src={person.pic} alt={person.position} onClick={() => this.toggleModal(person.pic)} /></div>
                <input className="mb-3" type="file" accept="image/jpeg" onChange={this.handleFileSelect} />
              </div>
              <div>
                <h4>职位:</h4>
                <input className="form-control mt-3 mb-3" value={person.position} onChange={(e) => this.handleInputChange('position', e.target.value)} />
              </div>
              <div>
                <h4>名字:</h4>
                <input className="form-control mt-3 mb-3" value={person.name} onChange={(e) => this.handleInputChange('name', e.target.value)} />
              </div>
              <div>
                <h4>介绍:</h4>
                <textarea style={{ height: "200px" }} className="form-control mt-3 mb-3" value={person.description} onChange={(e) => this.handleInputChange('description', e.target.value)} />
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

  renderAdd() {
    var person = this.state.addingState;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10 d-flex flex-column">
              <div className="d-flex flex-column">
                <h4>照片:</h4>
                <div className="mt-3 mb-3" style={{ height: "500px" }}><img style={{ maxHeight: "100%" }} src={person.pic} alt={person.position} onClick={() => this.toggleModal(person.pic)} /></div>
                <input className="mb-3" type="file" accept="image/jpeg" onChange={this.handleFileSelect} />
              </div>
              <div>
                <h4>职位:</h4>
                <input className="form-control mt-3 mb-3" value={person.position} onChange={(e) => this.handleInputChange('position', e.target.value)} />
              </div>
              <div>
                <h4>名字:</h4>
                <input className="form-control mt-3 mb-3" value={person.name} onChange={(e) => this.handleInputChange('name', e.target.value)} />
              </div>
              <div>
                <h4>介绍:</h4>
                <textarea style={{ height: "200px" }} className="form-control mt-3 mb-3" value={person.description} onChange={(e) => this.handleInputChange('description', e.target.value)} />
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
      <div>
        <Modal show={this.state.modal} toggle={() => this.toggleModal()} src={this.state.modalImg} />
        <h3 id="AboutPeople">主席团&部长：</h3>
        {(() => {
          if (this.state.editing) {
            return this.renderEdit();
          } else if (this.state.adding) {
            return this.renderAdd();
          } else {
            return this.renderAbout();
          }
        })()}
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStatToProps, actions)(AdminAboutList);