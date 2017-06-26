// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			isOpen: false,
			error: '',
		};
	}

	onSubmit(e) {
		const url = this.state.url;
		e.preventDefault();
		Meteor.call('links.insert', url, (err, res) => {
			if (!err) {
				this.setState({ url: '', isOpen: false, error: '' });
				this.handleModalClose();
			} else {
				this.setState({ error: err.reason });
			}
		});
	}
	onChange(e) {
		this.setState({ url: e.target.value.trim() });
	}
	handleModalClose() {
		this.setState({ isOpen: false, url: '', error: '' });
	}
	focusMyField() {
		console.log(this.refs);
		this.refs.url.focus();
	}
	render() {
		return (
			<div>
				<button className="button" onClick={() => this.setState({ isOpen: true })}>
					+ Add Link
				</button>
				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Add link"
					onAfterOpen={this.focusMyField.bind(this)}
					onRequestClose={this.handleModalClose.bind(this)}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view--modal"
				>
					<h1>Add link</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
						<input
							type="text"
							placeholder="URL"
							value={this.state.url}
							onChange={this.onChange.bind(this)}
						/>
						<button className="button">Add link</button>
						<button
							type="button"
							className="button button--secondary"
							onClick={this.handleModalClose.bind(this)}
						>
							Cancel
						</button>
					</form>
				</Modal>
			</div>
		);
	}
}

AddLink.propTypes = {};
