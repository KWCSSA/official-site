import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import HighlightEventCard from './HighlightEventCard';

class HighlightEvent extends React.Component {
	componentDidMount() {
		this.props.fetchEvent();
	}

	renderCards() {
		if (this.props.event) {
			var key = 0;
			return this.props.event.highlight.map(event => {
				key += 1;
				return <HighlightEventCard key={key} event={event} />;
			});
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className='row pt-5 text-center'>
					<div className='col footer-text'>精品活动</div>
				</div>
				<div className='row'>
					<div className='underline mt-2' />
				</div>
				{this.renderCards()}
				<div className='row pb-5' />
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		event: state.event
	};
}

export default connect(mapStateToProps, actions)(HighlightEvent);
