// @flow
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from './../api/links';
import LinksListItems from './LinksListItems';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: [],
		};
	}
	componentDidMount() {
		console.log('component did mount in LinksList');
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('links');
			const links = Links.find({
				visible: Session.get('showVisible'),
			}).fetch();
			this.setState({ links });
		});
	}
	componentWillUnmount() {
		console.log('componentWillUnmount in LinksList');
		this.linksTracker.stop();
	}
	renderLinksListItems() {
		if (this.state.links.length === 0) {
			return (
				<div className="item">
					<p className="item__status-message">No links found!</p>
				</div>
			);
		}
		return this.state.links.map(link => {
			// return <p key={link._id}>{link.url}</p>;
			const shortUrl = Meteor.absoluteUrl(link._id);
			return <LinksListItems key={link._id} shortUrl={shortUrl} {...link} />;
		});
	}
	render() {
		return (
			<div>
				<FlipMove maintainContainerHeight={true}>
					{this.renderLinksListItems()}
				</FlipMove>
			</div>
		);
	}
}
