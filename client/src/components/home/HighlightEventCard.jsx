import React from 'react';
import Fade from 'react-reveal/Fade';

import '../../css/home/highlightEventCard.css';

function cardOnClick(link) {
	window.location = link;
}

export default ({ event }) => {
	return (
		<Fade bottom>
			<div className='card shadow border' onClick={() => cardOnClick(event.link)}>
				<div className='card-img-top card-img'>
					<img className='card-pic' src={event.pic} alt={`${event.title} pic`} />
				</div>
				<div className='card-body'>
					<h3 className='card-title'>{event.title}</h3>
					<div className='card-text'>
						<p>{event.content}</p>
					</div>
					<div className='card-text'>
						<small className='text-muted'>点击查看详情</small>
					</div>
				</div>
			</div>
		</Fade>
	);
};
