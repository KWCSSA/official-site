import React from 'react';
import { connect } from 'react-redux';

import '../../css/freshman/freshman.css';

import * as actions from '../../actions';

class Freshman extends React.Component {
  componentDidMount() {
    this.props.fetchFreshman();
  }

  renderContent() {
    if (this.props.freshman) {
      console.log(this.props.freshman);
      return (
        <React.Fragment>
          <div className="congrats-en"><div className="congrats-en-text">Congratulations!</div></div>
          <div className="container mt-5 pb-5">
            <div className="congrats-message">
              <div className="congrats-message-text" style={{ fontFamily: "inherit" }}>致新生们：</div>
              <div className="congrats-message-text" style={{ fontFamily: "inherit" }}>{this.props.freshman.message}</div>
              <div className="congrats-message-text" style={{ fontFamily: "inherit", marginBottom: "5px" }}>滑铁卢-基奇纳中国学生学者联谊会</div>
              <div className="congrats-message-text" style={{ fontFamily: "inherit", marginBottom: "0px" }}>{this.props.freshman.date}</div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div style={{ background: "#fafafa" }} className="pt-5 pb-5">
        {this.renderContent()}
      </div>
    );
  }
}

function mapStatToProps(state) {
  return {
    freshman: state.freshman
  }
}

export default connect(mapStatToProps, actions)(Freshman);