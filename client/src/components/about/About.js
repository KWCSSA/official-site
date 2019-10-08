import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import '../../css/about/about.css';

import AboutCard from './AboutCard';

class About extends React.Component {
  componentDidMount() {
    this.props.fetchAbout();
  }

  renderCards() {
    if (this.props.about) {
      return this.props.about.people.map(person => {
        return <AboutCard key={person.name} {...person} />;
      });
    }
  }

  render() {
    return (
      <div style={{background: "#fafafa"}} className="pb-5">
        <div className="group-photo-wrapper">
          {this.props.about ? <img className='group-photo' src={this.props.about.photo} alt='group together' /> : ''}
        </div>
        <div className="container">
          <div className="about-card-wrapper pt-3">
            {this.renderCards()}
          </div>
        </div>
      </div>
    );
  }
  
}


function mapStateToProps(state) {
  return {
    about: state.about
  };
}

export default connect(mapStateToProps, actions)(About);