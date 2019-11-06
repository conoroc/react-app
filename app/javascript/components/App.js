import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Alert } from '../helpers/notifications'
import Editor from './Dashboard/Editor'

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/books/:id?" component={Editor} />
					</Switch>
				</BrowserRouter>
				<Alert stack={{ limit: 3 }} />
			</div>
		)
	}
}

export default App
