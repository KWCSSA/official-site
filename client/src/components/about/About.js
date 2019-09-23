import React from 'react';
import { connect } from 'react-redux';

import '../../css/about/about.css';

const About = props => {
  console.log(props.about);
  return (
    <div style={{background: "#fafafa"}} className="pt-5 pb-5">
      <div className="group-photo-wrapper">
        <img className='group-photo' src='http://localhost:8080/static/about-group-photo.jpg' alt='group together' /> {/* FIXME: change to relative path */}
      </div>
      <h2 className="section-title footer-text text-center">主席团</h2>
      <div className="underline mb-5 mt-3" />
      <h2 className="section-title footer-text text-center">部门介绍</h2>
      <div className="underline mb-5 mt-3" />
    </div>
  );
}


function mapStateToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStateToProps)(About);