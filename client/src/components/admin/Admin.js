import React from 'react';
import { connect } from 'react-redux';

import '../../css/admin.css';

import * as actions from '../../actions';

import AdminEventList from './AdminEventList';
import AdminEventBanners from './AdminEventBanners';
import AdminAboutList from './AdminAboutList';
import AdminHome from './AdminHome';
import AdminAboutPhoto from './AdminAboutPhoto';
import AdminFreshmanMessage from './AdminFreshmanMessage';
import AdminFreshmanBooklets from './AdminFreshmanBooklets';
import AdminFreshmanList from './AdminFreshmanList';
import UploadProgress from './UploadProgress';

class Admin extends React.Component {
	state = { username: '', password: '', init: true, message: '' };

	// componentDidUpdate() {
	// 	if (!this.state.init && !this.props.admin.auth) {
	// 		if (this.state.message !== '密码错误') {
	// 			this.setState({
	// 				message: '密码错误'
	// 			});
	// 		}
	// 	}
	// }
	componentDidUpdate() {
		console.log(this.state);
	}

	componentDidMount() {
		this.props.fetchAdminLoginStatus();
	}

	handleLogin() {
		// console.log(this.state.username, this.state.password);
		// this.props.adminLogin(this.state.username, this.state.password);
	}

	renderLogin() {
		// return <Redirect to='/admin/login' />;
		return <React.Fragment>{(window.localtion.href = '/admin/login')}</React.Fragment>;
		// return (
		// 	<div className='admin-login'>
		// 		<div class='d-block'>
		// 			<div className='form-group'>
		// 				<input
		// 					type='username'
		// 					className='form-control'
		// 					name='username'
		// 					placeholder='Username'
		// 					onChange={e => {
		// 						this.setState({ username: e.target.value });
		// 					}}
		// 					value={this.state.username}
		// 				/>
		// 			</div>
		// 			<div className='form-group'>
		// 				<input
		// 					type='password'
		// 					className='form-control'
		// 					name='password'
		// 					placeholder='Password'
		// 					onChange={e => {
		// 						this.setState({ password: e.target.value });
		// 					}}
		// 					value={this.state.password}
		// 				/>
		// 			</div>
		// 			<button className='btn btn-success w-100' onClick={() => this.handleLogin()}>
		// 				Login
		// 			</button>
		// 		</div>
		// 	</div>
		// );
	}

	renderAdminComponents() {
		return (
			<React.Fragment>
				<UploadProgress />
				<div className='container'>
					<div className='sidebar'>
						<button
							className='btn btn-outline-dark'
							style={{ marginTop: '5px' }}
							onClick={() => {
								window.location.href = '#Home';
							}}
						>
							Home
						</button>
						<button
							className='btn btn-outline-dark'
							style={{ marginTop: '5px' }}
							onClick={() => {
								window.location.href = '#Events';
							}}
						>
							Events
						</button>
						<button
							className='btn btn-outline-dark'
							style={{ marginTop: '5px' }}
							onClick={() => {
								window.location.href = '#AboutList';
							}}
						>
							About
						</button>
						<button
							className='btn btn-outline-dark'
							style={{ marginTop: '5px' }}
							onClick={() => {
								window.location.href = '#Freshman';
							}}
						>
							新生相关
						</button>
					</div>
					<div id='Home' className='sections mb-5'>
						<h1 className='mt-3 mb-3'>Home</h1>
						<AdminHome adminPassword={this.state.password} />
					</div>
					<div id='Events' className='sections mb-5'>
						<h1 className='mt-3 mb-3'>Events</h1>
						<h3 id='EventBanners'>EventBanners</h3>
						<AdminEventBanners adminPassword={this.state.password} />
						<h3 id='EventList' className='mt-3'>
							EventList
						</h3>
						<AdminEventList adminPassword={this.state.password} />
					</div>
					<div id='AboutList' className='sections'>
						<h1 className='mt-3 mb-3'>About</h1>
						<AdminAboutPhoto adminPassword={this.state.password} />
						<AdminAboutList adminPassword={this.state.password} />
					</div>
					<div id='Freshman' className='sections mt-5'>
						<h1 className='mt-3 mb-3'>新生相关</h1>
						<h3 id='FreshmanMessage' className='mt-3'>
							新生寄语
						</h3>
						<AdminFreshmanMessage adminPassword={this.state.password} />
						<h3 id='FreshmanBooklets' className='mt-3'>
							新生手册&安全手册
						</h3>
						<AdminFreshmanBooklets adminPassword={this.state.password} />
						<h3 id='FreshmanList' className='mt-3'>
							新生必读
						</h3>
						<AdminFreshmanList adminPassword={this.state.password} />
					</div>
					<div style={{ marginTop: '100px' }} />
				</div>
			</React.Fragment>
		);
	}

	render() {
		return this.props.admin.user ? this.renderAdminComponents() : this.renderLogin();
	}
}

function mapStatToProps(state) {
	return {
		admin: state.admin
	};
}

export default connect(mapStatToProps, actions)(Admin);
