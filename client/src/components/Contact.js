import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Contact extends React.Component {
  handleSubmit() {
    console.log('submit');
    this.props.sendMessage();
  }

  render() {
    console.log(this.props.contact);
    return (
      <div style={{marginTop: '100px'}}>
        <div>{this.props.contact ? `${this.props.contact.msgResponse.success} - ${this.props.contact.msgResponse.errorMsg}` : ''}</div>
        <button onClick={this.handleSubmit.bind(this)}>Test</button>
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    contact: state.contact
  }
}

export default connect(mapStatToProps, actions)(Contact);