import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import '../css/root.css';

import Scroll from 'react-scroll';

import NavBar from './NavBar';
import Home from './home/Home';
import About from './about/About';
import Freshman from './freshman/Freshman';
import Events from './events/Events';
import Contact from './contact/Contact';
import Footer from './Footer';
import NotFound404 from './NotFound404';

var scroll = Scroll.animateScroll;

class Root extends React.Component {
	state = { showBackToTop: false };

	componentDidMount() {
		window.addEventListener('scroll', this.onPageScroll.bind(this));
	}

	onPageScroll() {
		const scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
		const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolledPercent = scrollPos / windowHeight;

		if (scrolledPercent > 0.45) {
			if (this.state.showBackToTop !== true) {
				this.setState({
					showBackToTop: true
				});
			}
		} else {
			if (this.state.showBackToTop !== false) {
				this.setState({
					showBackToTop: false
				});
			}
		}
	}

	renderBackToTopBtn() {
		return (
			<div
				className='d-flex justify-content-center align-items-center back-to-top'
				onClick={() => {
					scroll.scrollToTop();
				}}
			>
				<i className='material-icons' style={{ color: '#fff' }}>
					keyboard_arrow_up
				</i>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<NavBar scroll={scroll} />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/about' component={About} />
					<Route exact path='/freshman' component={Freshman} />
					<Route exact path='/events' component={Events} />
					<Route exact path='/contact' component={Contact} />
					<Route component={NotFound404} />
				</Switch>
				<Footer />
				{this.state.showBackToTop ? this.renderBackToTopBtn() : ''}
			</React.Fragment>
		);
	}
}

export default connect(null, actions)(Root);
