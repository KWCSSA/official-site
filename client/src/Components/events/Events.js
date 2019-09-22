import React from 'react';
import { connect } from 'react-redux';
import EventCard from './EventCard';

const Events = (props) => {
  function renderCards() {
    if (props.home) {
      var key = 0;
      return props.home.events.map(event => {
        key += 1;
        return <EventCard key={key} event={event} />
      })
    }
  }
  return (
    <div style={{background: "#fafafa"}} className="pt-5 pb-5">
      <div className="container">
        <h2 style={{marginTop: "120px"}}>Events</h2>
        {renderCards()}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

export default connect(mapStateToProps)(Events);