import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class AdminFreshmanMessage extends React.Component {
	state = { message: null, date: null, editing: null, editingState: null };

	componentDidMount() {
		this.props.fetchFreshman();
	}

	componentDidUpdate() {
		if (this.props.freshman) {
			var oldMessage = this.state.message;
			var newMessage = this.props.freshman.message;
			var oldDate = this.state.date;
			var newDate = this.props.freshman.date;
			if (oldMessage !== newMessage || oldDate !== newDate) {
				this.setState({
					message: this.props.freshman.message,
					date: this.props.freshman.date
				});
			}
		}
	}

	handleConfirmClick() {
		this.props.updateFreshmanMessage(this.state.editingState);
		this.setState({
			editing: null,
			editingState: null
		});
	}

	handleCancelClick() {
		this.setState({
			editing: null,
			editingState: null
		});
	}

	handleInputChange(field, value) {
		this.setState(prevState => {
			var updatedState = prevState.editingState;
			if (field === 'message') {
				updatedState[field] = value.split('|').map(e => e.trim());
			} else {
				updatedState[field] = value;
			}
			return {
				editingState: updatedState
			};
		});
	}

	renderEditContent() {
		return (
			<ul className='list-group'>
				<li className='list-group-item'>
					<div className='row'>
						<div className='col-11'>
							<label style={{ fontWeight: 'bold', color: 'red' }}>请用“|”将段落隔开：</label>
							<textarea
								style={{ width: '100%', height: '300px' }}
								value={this.state.editingState.message.join('|')}
								onChange={e => this.handleInputChange('message', e.target.value)}
							/>
							<label>日期：</label>
							<input
								style={{ width: '100%' }}
								value={this.state.editingState.date}
								onChange={e => this.handleInputChange('date', e.target.value)}
							/>
						</div>
						<div className='col-1'>
							<button
								className='btn btn-outline-success'
								style={{ width: '100%', height: '50px' }}
								onClick={() => {
									this.handleConfirmClick();
								}}
							>
								<i className='material-icons'>check</i>
							</button>
							<button
								className='btn btn-outline-warning'
								style={{ width: '100%', height: '50px', marginTop: '10px' }}
								onClick={() => {
									this.handleCancelClick();
								}}
							>
								<i className='material-icons'>close</i>
							</button>
						</div>
					</div>
				</li>
			</ul>
		);
	}

	handleEditClick() {
		window.location.href = '#FreshmanMessage';
		this.setState({
			editing: true,
			editingState: {
				message: this.state.message,
				date: this.state.date
			}
		});
	}

	renderContent() {
		if (this.state.message) {
			return (
				<ul className='list-group'>
					<li className='list-group-item'>
						<div className='row'>
							<div className='col-11' style={{ minHeight: '100px' }}>
								{this.state.message.map((parag, i) => (
									<p key={i} style={{ marginBottom: '30px' }}>
										{parag}
									</p>
								))}
								<div style={{ width: '100%' }}>{this.state.date}</div>
							</div>
							<div className='col-1'>
								<button
									className='btn btn-outline-dark d-flex justify-content-center align-items-center'
									style={{ width: '100%', height: '50px' }}
									onClick={() => {
										this.handleEditClick();
									}}
								>
									<i className='material-icons'>edit</i>
								</button>
							</div>
						</div>
					</li>
				</ul>
			);
		}
	}

	render() {
		return <React.Fragment>{this.state.editing ? this.renderEditContent() : this.renderContent()}</React.Fragment>;
	}
}

function mapStatToProps(state) {
	return {
		freshman: state.freshman
	};
}

export default connect(mapStatToProps, actions)(AdminFreshmanMessage);
