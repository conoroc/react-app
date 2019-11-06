import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import PropsRoute from '../PropsRoute'

import { handleAjaxError } from '../../helpers/validations'
import { success } from '../../helpers/notifications'
import Header from './Header'
import BookForm from '../Books/BookForm'
import Book from '../Books/Book'
import MyBookList from '../Books/MyBookList'

class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			books: null,
		}

		this.addBook = this.addBook.bind(this)
		this.updateBook = this.updateBook.bind(this)
		this.deleteBook = this.deleteBook.bind(this)
	}

	componentDidMount() {
		axios
			.get('/api/books.json')
			.then(response => this.setState({ books: response.data }))
			.catch(handleAjaxError)
	}

	addBook(newBook) {
		axios
			.post('/api/books.json', newBook)
			.then(response => {
				success('Book added')
				const savedBook = response.data
				this.setState(prevState => ({
					books: [...prevState.books, savedBook],
				}))
				const { history } = this.props
				history.push(`/books/${savedBook.id}`)
			})
			.catch(handleAjaxError)
	}

	updateBook(updatedBook) {
		axios
			.put(`/api/books/${updatedBook.id}.json`, updatedBook)
			.then(() => {
				success('Book updated')
				const { books } = this.state
				const idx = books.findIndex(book => book.id === updatedBook.id)
				books[idx] = updatedBook
				const { history } = this.props
				history.push(`/books/${updatedBook.id}`)
				this.setState({ books })
			})
			.catch(handleAjaxError)
	}

	deleteBook(bookId) {
		const sure = window.confirm('Are you sure?')
		if (sure) {
			axios
				.delete(`/api/books/${bookId}.json`)
				.then(response => {
					if (response.status === 204) {
						success('Book deleted')
						const { history } = this.props
						history.push('/books')

						const { books } = this.state
						this.setState({
							books: books.filter(book => book.id !== bookId),
						})
					}
				})
				.catch(handleAjaxError)
		}
	}

	render() {
		const { books } = this.state
		if (books === null) return null
		debugger
		const { match } = this.props
		const bookId = match.params.id
		const book = books.find(b => b.id === Number(bookId))

		return (
			<div>
				<Header />
				<div className="grid">
					<MyBookList books={books} activeId={Number(bookId)} />
					<Switch>
						<PropsRoute
							path="/books/new"
							component={BookForm}
							onSubmit={this.addBook}
						/>
						<PropsRoute
							exact
							path="/books/:id/edit"
							component={BookForm}
							book={book}
							onSubmit={this.updateBook}
						/>
						<PropsRoute
							path="/books/:id"
							component={Book}
							book={book}
							onDelete={this.deleteBook}
						/>
					</Switch>
				</div>
			</div>
		)
	}
}

Editor.propTypes = {
	match: PropTypes.shape(),
	history: PropTypes.shape({ push: PropTypes.func }).isRequired,
}

Editor.defaultProps = {
	match: undefined,
}

export default Editor
