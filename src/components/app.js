import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Dashboard from './dashboard';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Dashboard />
			</div>
		);
	}
}
