import React from 'react';
import { connect } from 'react-redux';

import '../../css/about/about.css';

import AboutCard from './AboutCard';

const About = props => {
  function renderCards() {
    if (props.about) {
      return props.about.people.map(person => {
        return <AboutCard key={person.name} {...person} />;
      });
    }
  }

  return (
    <div style={{background: "#fafafa"}} className="pb-5">
      <div className="group-photo-wrapper">
        {props.about ? <img className='group-photo' src={props.about.photo} alt='group together' /> : ''}
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