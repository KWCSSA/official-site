import React from 'react';
import { connect } from 'react-redux';

import '../../css/contact/contact.css';

import * as actions from '../../actions';

import ContactForm from './ContactForm';

function mapStatToProps(state) {
	return {
		contact: state.contact,
		formValues: state.form.contactForm
	};
}

class Contact extends React.Component {
	state = { clear: true };

	async handleSubmit() {
		this.setState({ clear: false });
		await this.props.sendMessageLoading();
		await this.props.sendMessage(this.props.formValues.values);
	}

	componentWillUnmount() {
		this.props.clearMessageStatus();
	}

	componentDidUpdate() {
		if (this.props.contact) {
			if (!this.state.clear && this.props.contact.success && !this.props.contact.sending) {
				this.props.clearContactForm();
				this.setState({ clear: true });
			}
		}
	}

	render() {
		return (
			<div style={{ background: '#fafafa' }} className='pt-5 pb-5'>
				<div className='container'>
					<h2 className='footer-text text-center' style={{ marginTop: '80px' }}>
						联系我们
					</h2>
					<div className='underline mb-5 mt-3' />
					<div className='row ml-lg-5 mr-lg-5 ml-1 mr-1'>
						<div className='col-12 col-md-6 form-pic'>
							<img style={{ maxWidth: '100%' }} src='/contact.jpg' alt='contact' />
						</div>
						<div className='col-12 col-md-6 form-wrapper mt-4'>
							<ContactForm onSubmit={this.handleSubmit.bind(this)} msgResponse={this.props.contact} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStatToProps, actions)(Contact);
