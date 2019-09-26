import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import * as _ from 'lodash';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminEventList extends React.Component {
  state = { events: [], fetched: false, updated: false, editing: null, editingState: null, modal: false, modalImg: null }

  componentDidMount() {
    this.props.fetchEvent();
  }

  componentDidUpdate() {
    if (!this.state.fetched && this.props.event) {
      this.setState({
        fetched: true,
        events: this.props.event.events
      });
    }
    if (this.state.updated) {
      this.props.updateEventList(this.state.events);
      this.setState({
        updated: false
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(prevState => {
      return {
        events: arrayMove(prevState.events, oldIndex, newIndex),
        updated: true
      };
    });
  };

  handleEditClick(id) {
    this.setState({
      editing: id,
      editingState: _.cloneDeep(this.state.events.filter(element => element.id === id)[0])
    });
  }

  handleDeleteClick(id) {
    this.setState(prevState => {
      return {
        events: prevState.events.filter(element => element.id !== id),
        updated: true
      }
    })
  }

  renderEvents() {
    const DragHandle = SortableHandle(() => (<div className="h-100 w-100 d-flex justify-content-center align-items-center drag-handle"><i className="material-icons">drag_handle</i></div>));

    const renderEventItem = event => {
      return (
        <div className="row">
          <div className="col-1">
            <DragHandle />
          </div>
          <div className="col-4" onClick={() => this.toggleModal(event.pic)}>
            <img style={{maxWidth: "100%", cursor: "pointer"}} src={event.pic} alt={event.title} />
          </div>
          <div className="col-6 d-flex flex-column">
            <div>
              <h3>{event.title}</h3>
            </div>
            <div>
              <p>{event.content}</p>
            </div>
            <div>
              <a href={event.link}><p>{event.link}</p></a>
            </div>
            <div>
              <h5>主页显示: {event.highlight ? 'Yes' : 'No'}</h5>
            </div>
          </div>
          <div className="col-1">
            <button className="btn btn-outline-dark" style={{ width: "100%" }} onClick={() => {this.handleEditClick(event.id)}}><i className="material-icons">edit</i></button>
            <button className="btn btn-outline-danger" style={{ width: "100%", marginTop: '10px' }} onClick={() => {this.handleDeleteClick(event.id)}}><i className="material-icons">delete_forever</i></button>
          </div>
        </div>
      );
    };

    const SortableEventItem = SortableElement(({ value }) => <li className="list-group-item">{renderEventItem(value)}</li>);

    const SortableEventList = SortableContainer(({ items }) => {
      return (
        <ul className="list-group">
          {items.map((value, index) => (
            <SortableEventItem key={`item-${index}`} index={index} value={value} />
          ))}
        </ul>
      );
    });

    if (this.state.fetched) {
      return <SortableEventList items={this.state.events} onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis="y" />;
    }
  }

  handleConfirmClick() {
    this.props.updateEventDetail(this.state.editingState);
    this.setState({
      editing: null,
      editingState: null
    })
  }

  handleCancelClick() {
    this.setState({
      editing: null,
      editingState: null
    });
  }

  handleInputChange(field, value) {
    this.setState(prevState => {
      var updatedEvents = prevState.editingState;
      updatedEvents[field] = value;
      return {
        editingState: updatedEvents
      }
    });
  }

  handleFileSelect = event => {
    var file = event.target.files[0];
    this.setState(prevState => {
      var updatedEvents = prevState.editingState;
      updatedEvents.pic = URL.createObjectURL(file);
      updatedEvents.fileChanged = true;
      updatedEvents.file = file;
      return {
        editingState: updatedEvents
      }
    });
  }

  renderEdit() {
    var event = this.state.editingState; // Editing event
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10 d-flex flex-column">
              <div className="d-flex flex-column">
                <h4>Pic:</h4>
                <div className="mt-3 mb-3" style={{height: "500px"}}><img style={{maxHeight: "100%"}} src={event.pic} alt={event.title} onClick={() => this.toggleModal(event.pic)} /></div>
                <input className="mb-3" type="file" accept="image/*" onChange={this.handleFileSelect} />
              </div>
              <div>
                <h4>Title:</h4>
                <input className="form-control mt-3 mb-3" value={event.title} onChange={(e) => this.handleInputChange('title', e.target.value)} />
              </div>
              <div>
                <h4>Content:</h4>
                <textarea style={{height: "300px"}} className="form-control mt-3 mb-3" value={event.content} onChange={(e) => this.handleInputChange('content', e.target.value)} />
              </div>
              <div>
                <h4>Link:</h4>
                <input className="form-control mt-3 mb-3" value={event.link} onChange={(e) => this.handleInputChange('link', e.target.value)} />
              </div>
              <div>
                <h4>Highlighted:</h4>
                <input className="form-control mt-3 mb-3" type="checkbox" style={{height: "25px", width: "25px"}} onChange={(e) => this.handleInputChange('highlight', e.target.checked)} checked={event.highlight} />
              </div>
            </div>
            <div className="col-1">
              <button className="btn btn-outline-success" style={{ width: "100%" }} onClick={() => {this.handleConfirmClick()}}><i className="material-icons">check</i></button>
              <button className="btn btn-outline-warning" style={{ width: "100%", marginTop: '10px' }} onClick={() => {this.handleCancelClick()}}><i className="material-icons">close</i></button>
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
      <React.Fragment>
        <Modal show={this.state.modal} toggle={() => this.toggleModal()} src={this.state.modalImg} />
        {this.state.editing ? this.renderEdit() : this.renderEvents()}
      </React.Fragment>
    );
  }
}

function mapStatToProps(state) {
  return {
    event: state.event
  };
}

export default connect(mapStatToProps, actions)(AdminEventList);