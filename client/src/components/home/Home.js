import React from 'react';
import { connect } from 'react-redux';

import '../../css/home/home.css';

import * as actions from '../../actions';

import HighlightEvent from './HighlightEvent';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchHome();
  }

  componentDidUpdate() {
  }

  renderTodayTop() {
    if (this.props.home) {
      return (
        <section className="section-wrapper mb-3 pb-4">
          <div className="container">
            <div className="row pt-5 text-center">
              <div className="col footer-text">今日头条</div> {/* FIXME: come up with a better section name */}
            </div>
            <div className="row">
              <div className="underline mt-2" />
            </div>
            <div className="card shadow border p-3 mb-5" onClick={() => { window.location = this.props.home.top.link }}>
              <div className="row">
                <div className="col-2 col-lg-1 d-flex justify-content-end align-items-center">
                  <i className="material-icons" style={{ fontSize: "30px" }}>stars</i>
                </div>
                <div className="col-8 col-lg-10 d-flex flex-column">
                  <div className="top-title">{this.props.home.top.title}</div>
                </div>
                <div className="col-2 col-lg-1 d-flex justify-content-end align-items-center">
                  <i className="material-icons" style={{ fontSize: "30px" }}>stars</i>
                </div>
              </div>
              <div className="row mt-3 d-flex justify-content-center">
                <small className="text-muted">点击查看详情</small>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="home-overlay">
          <div className="overlay-mask d-flex justify-content-center">
            <h1 className="ml-sm-5 ml-3 home-text">滑铁卢-基奇纳</h1>
            <h1 className="ml-sm-5 ml-3 home-text">中国学生学者联谊会</h1>
            <h1 className="ml-sm-5 ml-3 home-text-eng">Kitchener-Waterloo Chinese Student & Scholars Association</h1>
          </div>
        </section>
        <section className="section-wrapper">
          <div className="container mt-3 mb-3 description">
            <div className="row">
              <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center"><img src="/logo.png" alt="KWCSSA logo" className="description-logo" /></div>
              <div className="col-12 d-lg-none mt-4 "></div>
              <div className="col-12 col-lg-8 d-flex align-items-center justify-content-center description-text ch-text"> {/* TODO: Make this dynamic */}
                {this.props.home ? this.props.home.description : ''}
              </div>
            </div>
          </div>
        </section>
        {this.renderTodayTop()}
        <section className="section-wrapper">
          <div className="container pb-5"><HighlightEvent /></div>
        </section>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps, actions)(Home);