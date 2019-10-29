import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Home';
import About from './About';

class App extends Component {
	render() {
		return (
			<div>
				<Route path="/home" component={Home} />
				<Route path="/about" component={About} />
			</div>
		);
	}
}

export default App;
