import React from 'react';
import { connect } from 'react-redux';

import '../../css/freshman/freshman.css';

import * as actions from '../../actions';

import FreshmanList from './FreshmanList';

class Freshman extends React.Component {
	componentDidMount() {
		this.props.fetchFreshman();
	}

	renderContent() {
		if (this.props.freshman) {
			const freshman = this.props.freshman;
			return (
				<React.Fragment>
					<div className='congrats-en'>
						<div className='congrats-en-text'>Congratulations!</div>
					</div>
					<div className='section-wrapper pt-5 pb-5 mb-3'>
						<div className='container'>
							<div className='congrats-message'>
								<div className='congrats-message-text' style={{ fontFamily: 'inherit' }}>
									致新生们：
								</div>
								<div className='congrats-message-text' style={{ fontFamily: 'inherit' }}>
									{freshman.message.map((parag, i) => (
										<p key={i} style={{ fontFamily: 'inherit', marginBottom: '20px' }}>
											{parag}
										</p>
									))}
								</div>
								<div className='congrats-message-text' style={{ fontFamily: 'inherit', marginBottom: '5px' }}>
									滑铁卢-基奇纳中国学生学者联谊会
								</div>
								<div className='congrats-message-text' style={{ fontFamily: 'inherit', marginBottom: '0px' }}>
									{freshman.date}
								</div>
							</div>
						</div>
					</div>
					<div className='section-wrapper mb-3'>
						<div className='container pb-5'>
							<div className='row pt-5 text-center'>
								<div className='col footer-text'>必读手册</div>
							</div>
							<div className='row'>
								<div className='underline mt-2' />
							</div>
							<div className='row mt-2 mt-md-4 pb-4'>
								<div className='col-12 col-md-6'>
									<a
										className='d-flex justify-content-center align-items-center booklet-link'
										href={freshman.newStudentBooklet.link}
									>
										<img className='booklet-cover' src={freshman.newStudentBooklet.pic} alt='new student booklet' />
									</a>
								</div>
								<div className='col-12 col-md-6 mt-5 mt-md-0'>
									<a
										className='d-flex justify-content-center align-items-center booklet-link'
										href={freshman.safetyBooklet.link}
									>
										<img className='booklet-cover' src={freshman.safetyBooklet.pic} alt='new student booklet' />
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className='section-wrapper mb-3 pb-4'>
						<div className='container mt-2 pb-5'>
							<div className='row pt-5 text-center'>
								<div className='col footer-text'>生存指南</div>
							</div>
							<div className='row'>
								<div className='underline mt-2' />
							</div>
							<FreshmanList posts={freshman.posts} />
						</div>
					</div>
				</React.Fragment>
			);
		}
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

function mapStatToProps(state) {
	return {
		freshman: state.freshman
	};
}

export default connect(mapStatToProps, actions)(Freshman);
