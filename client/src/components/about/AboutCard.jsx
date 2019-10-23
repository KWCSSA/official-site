import React from 'react';

import '../../css/about/aboutCard.css';

export default props => {
	return (
		<div className='card shadow-sm border hover-default p-1'>
			<div className='row m-1 mt-3 mb-3'>
				<div className='col-12 col-md-4 about-card-pic-wrapper'>
					<img className='about-card-pic' src={props.pic} alt={`${props.position} ${props.name}`} />
				</div>
				<div className='col-12 col-md-8 about-card-detail mt-2 mt-md-0'>
					<div className='about-card-detail-position text-md-left'>{props.position}</div>
					<div className='about-card-detail-name text-md-left'>{props.name}</div>
					<div className='about-card-detail-desc text-md-left'>{props.description}</div>
				</div>
			</div>
		</div>
	);
};
