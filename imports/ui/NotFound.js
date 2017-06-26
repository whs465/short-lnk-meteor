import React from 'react';
import { Link } from 'react-router';

export default () => {
	return (
		<div className="boxed-view">
			<div className="boxed-view__box">
				<h1>Page not Found</h1>
				<p>We are unable to find that page!</p>
				<Link to="/" className="button button--link">HEAD HOME</Link>
			</div>
		</div>
	);
};
