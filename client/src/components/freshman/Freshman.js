import React from 'react';
import { connect } from 'react-redux';

import '../../css/contact/contact.css';

import * as actions from '../../actions';

class Freshman extends React.Component {

  render() {
    return (
      <div style={{ background: "#fafafa" }} className="pt-5 pb-5">
        <div className="container">
          <h2 className="footer-text text-center" style={{ marginTop: "80px" }}>Freshman</h2>
        </div>
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    // freshman: state.freshman
  }
}

export default connect(mapStatToProps, actions)(Freshman);