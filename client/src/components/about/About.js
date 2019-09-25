import React from 'react';
import { connect } from 'react-redux';

import '../../css/about/about.css';

import AboutCard from './AboutCard';

const About = props => {
  function renderCards() {
    if (props.about) {
      return props.about.map(person => {
        return <AboutCard key={person.name} {...person} />;
      });
    }
  }

  return (
    <div style={{background: "#fafafa"}} className="pt-5 pb-5">
      <div className="group-photo-wrapper">
        <img className='group-photo' src='http://localhost:8080/static/about-group-photo.jpg' alt='group together' /> {/* FIXME: change to relative path */}
      </div>
      <div className="container">
        <div className="about-card-wrapper pt-3">
          {renderCards()}
        </div>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStateToProps)(About);