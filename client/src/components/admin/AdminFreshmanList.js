import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import * as _ from 'lodash';

import * as actions from '../../actions';

import Modal from './Modal';

class AdminFreshmanList extends React.Component {
	state = {
		posts: [],
		updated: false,
		editing: null,
		editingState: null,
		adding: false,
		addingState: null,
		modal: false,
		modalImg: null
	};

	componentDidUpdate() {
		if (this.props.freshman) {
			var oldPosts = JSON.stringify(this.state.posts);
			var newPosts = JSON.stringify(this.props.freshman.posts);
			if (oldPosts !== newPosts) {
				this.setState({
					posts: this.props.freshman.posts
				});
			}
		}
		if (this.state.updated) {
			this.props.updateFreshmanList(this.state.posts, this.props.adminPassword);
			this.setState({
				updated: false
			});
		}
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(prevState => {
			return {
				posts: arrayMove(prevState.posts, oldIndex, newIndex),
				updated: true
			};
		});
	};

	handleEditClick(id) {
		window.location.href = '#FreshmanList';
		this.setState({
			editing: id,
			editingState: _.cloneDeep(this.state.posts.filter(element => element.id === id)[0])
		});
	}

	handleDeleteClick(id) {
		this.props.deleteFreshmanPost(id, this.props.adminPassword);
		this.setState(prevState => {
			return {
				posts: prevState.posts.filter(element => element.id !== id)
			};
		});
	}

	renderList() {
		const DragHandle = SortableHandle(() => (
			<div className='h-100 w-100 d-flex justify-content-center align-items-center drag-handle'>
				<i className='material-icons'>drag_handle</i>
			</div>
		));

		const renderListItem = post => {
			return (
				<div className='row'>
					<div className='col-1'>
						<DragHandle />
					</div>
					<div className='col-9 d-flex align-items-center'>
						<h5>{post.title}</h5>
					</div>
					<div className='col-1 d-flex align-items-center'>
						<a className='d-flex' href={post.link} target='_blank' rel='noopener noreferrer'>
							<h4 style={{ textDecoration: 'underline' }}>链接</h4>
						</a>
					</div>
					<div className='col-1'>
						<button
							className='btn btn-outline-dark d-flex justify-content-center align-items-center'
							style={{ width: '100%', height: '50px' }}
							onClick={() => {
								this.handleEditClick(post.id);
							}}
						>
							<i className='material-icons'>edit</i>
						</button>
						<button
							className='btn btn-outline-danger d-flex justify-content-center align-items-center'
							style={{ width: '100%', height: '50px', marginTop: '10px' }}
							onClick={() => {
								this.handleDeleteClick(post.id);
							}}
						>
							<i className='material-icons'>delete_forever</i>
						</button>
					</div>
				</div>
			);
		};

		const SortableEventItem = SortableElement(({ value }) => (
			<li className='list-group-item'>{renderListItem(value)}</li>
		));

		const SortableEventList = SortableContainer(({ items }) => {
			return (
				<ul className='list-group'>
					<li className='list-group-item d-flex justify-content-center'>
						<button className='btn btn-success w-25' onClick={() => this.handleAddClick()}>
							<i className='material-icons'>add</i>
						</button>
					</li>
					{items.map((value, index) => <SortableEventItem key={`item-${index}`} index={index} value={value} />)}
				</ul>
			);
		});

		return <SortableEventList items={this.state.posts} onSortEnd={this.onSortEnd} useDragHandle={true} lockAxis='y' />;
	}

	handleConfirmClick() {
		if (this.state.adding) {
			this.props.addNewFreshmanPost(this.state.addingState, this.props.adminPassword);
			this.setState({
				adding: null,
				addingState: null
			});
		} else if (this.state.editing) {
			this.props.updateFreshmanPostDetail(this.state.editingState, this.props.adminPassword);
			this.setState({
				editing: null,
				editingState: null
			});
		}
	}

	handleCancelClick() {
		this.setState({
			editing: null,
			editingState: null,
			adding: null,
			addingState: null
		});
	}

	handleAddClick() {
		window.location.href = '#FreshmanList';
		this.setState({
			adding: true,
			addingState: {
				title: '',
				link: ''
			}
		});
	}

	handleInputChange(field, value) {
		this.setState(prevState => {
			var updatedEvents = null;
			if (this.state.editing) {
				updatedEvents = prevState.editingState;
			} else if (this.state.adding) {
				updatedEvents = prevState.addingState;
			}
			updatedEvents[field] = value;
			if (this.state.editing) {
				return {
					addingState: updatedEvents
				};
			} else if (this.state.adding) {
				return {
					editingState: updatedEvents
				};
			}
		});
	}

	renderEdit() {
		var post = this.state.editingState;
		return (
			<ul className='list-group'>
				<li className='list-group-item'>
					<div className='row'>
						<div className='col-11 d-flex flex-column'>
							<h4>标题：</h4>
							<input
								value={post.title}
								style={{ width: '100%', fontSize: '1.5rem', marginBottom: '20px' }}
								onChange={e => this.handleInputChange('title', e.target.value)}
							/>
							<h4>链接：</h4>
							<input
								value={post.link}
								style={{ width: '100%' }}
								onChange={e => this.handleInputChange('link', e.target.value)}
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

	renderAdd() {
		var post = this.state.addingState;
		return (
			<ul className='list-group'>
				<li className='list-group-item'>
					<div className='row'>
						<div className='col-11 d-flex flex-column'>
							<h4>标题：</h4>
							<input
								value={post.title}
								style={{ width: '100%', fontSize: '1.5rem', marginBottom: '20px' }}
								onChange={e => this.handleInputChange('title', e.target.value)}
							/>
							<h4>链接：</h4>
							<input
								value={post.link}
								style={{ width: '100%' }}
								onChange={e => this.handleInputChange('link', e.target.value)}
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

	toggleModal(src = null) {
		if (src) {
			this.setState({
				modalImg: src
			});
		}
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	render() {
		return (
			<div>
				<Modal show={this.state.modal} toggle={() => this.toggleModal()} src={this.state.modalImg} />
				{(() => {
					if (this.state.editing) {
						return this.renderEdit();
					} else if (this.state.adding) {
						return this.renderAdd();
					} else {
						return this.renderList();
					}
				})()}
			</div>
		);
	}
}

function mapStatToProps(state) {
	return {
		freshman: state.freshman
	};
}

export default connect(mapStatToProps, actions)(AdminFreshmanList);
