import React from 'react';
import { connect } from 'react-redux';
import EventCard from './EventCard';

import '../../css/events/event.css';

const Events = (props) => {
  function renderCards() {
    if (props.event) {
      var key = 0;
      return props.event.events.map(event => {
        key += 1;
        return <EventCard key={key} event={event} />
      })
    }
  }
  return (
    <div style={{background: "#fafafa"}} className="pt-5 pb-5">
      <div className="container">
        <h2 className="footer-text text-center" style={{marginTop: "80px"}}>近期活动一览</h2>
        <div className="underline mb-5 mt-3" />
        {renderCards()}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    event: state.event
  };
}

export default connect(mapStateToProps)(Events);