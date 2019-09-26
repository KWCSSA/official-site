import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import * as actions from '../../actions';

class AdminAboutList extends React.Component {
  onSortEnd = key => ({ oldIndex, newIndex }) => {
    this.setState(prevState => {
      var newState = {};
      newState[key] = arrayMove(prevState[key], oldIndex, newIndex);
      newState[`${key}Updated`] = true;
      return newState;
    });
  };

  renderAbout() {
    const DragHandle = SortableHandle(() => (<div className="h-100 w-100 d-flex justify-content-center align-items-center drag-handle"><i className="material-icons">drag_handle</i></div>));

    const renderAboutItem = person => {
      return (
        <div className="row">
          <div className="col-1">
            <DragHandle />
          </div>
          <div className="col-10 d-flex flex-column">
            <div>{}</div>
          </div>
          <div className="col-1">
            <button className="btn btn-outline-danger" style={{ width: "100%" }}><i className="material-icons">delete_forever</i></button>
          </div>
        </div>
      );
    };

    const SortableAboutItem = SortableElement(({ value }) => <li className="list-group-item">{renderAboutItem(value)}</li>);

    const SortableAboutList = SortableContainer(({ items }) => {
      return (
        <ul className="list-group">
          {items.map((value, index) => (
            <SortableAboutItem key={`item-${index}`} index={index} value={value} />
          ))}
        </ul>
      );
    });
    if (this.state.aboutFetched) {
      return <SortableAboutList items={this.state.about} onSortEnd={this.onSortEnd('about')} useDragHandle={true} />;
    }
  };

  render() {
    return <React.Fragment>
      {this.renderAbout()}
    </React.Fragment>;

  }
}

function mapStatToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStatToProps, actions)(AdminAboutList);