import React from 'react';

import '../../css/about/aboutPresidentCard.css';

function cardOnClick(link) {
  window.location = link;
}

export default ({event}) => {
  return (
    <div className="card shadow border" onClick={() => cardOnClick(event.link)}>
      <div className="row m-1 mt-3 mb-3">
        <div className="col-lg-6 col-12 event-pic-wrapper">
          <img className="event-pic" src={event.pic} alt={`${event.title} pic`} />
        </div>
        <div className="col-lg-6 col-12 event-detail">
          <div className="row event-title pl-3 pr-3 mb-3 mt-3 mt-lg-0">{event.title}</div>
          <div className="row event-content pl-3 pr-3 mb-5">{event.content}</div>
          <div className="row pl-3 pr-3 mt-4 stick-bot"><small className="text-muted">点击查看详情</small></div>
        </div>
      </div>
    </div>
  )
};