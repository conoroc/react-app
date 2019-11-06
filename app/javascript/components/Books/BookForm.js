import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateBook } from '../../helpers/validations';
import BookNotFound from '../BookNotFound';
import { Link } from 'react-router-dom';

class BookForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			book: props.book,
			errors: {},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
		this.updateBook = this.updateBook.bind(this);
	}

	componentWillReceiveProps({ book }) {
		this.setState({ book });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { book } = this.state;
		const errors = validateBook(book);
		if (!isEmptyObject(errors)) {
			this.setState({ errors });
		} else {
			const { onSubmit } = this.props;
			onSubmit(book);
		}
	}

	handleInputChange(book) {
		const { target } = book;
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.updateBook(name, value);
	}

	renderErrors() {
		const { errors } = this.state;

		if (isEmptyObject(errors)) {
			return null;
		}

		return (
			<div className="errors">
				<h3>The following errors prohibited the book from being saved:</h3>
				<ul>
					{Object.values(errors).map(error => (
						<li key={error}>{error}</li>
					))}
				</ul>
			</div>
		);
	}

	updateBook(key, value) {
		this.setState(prevState => ({
			book: {
				...prevState.book,
				[key]: value,
			},
		}));
	}

	render() {
		const { book } = this.state;
		const { path } = this.props;

		if (!book.id && path === '/books/:id/edit') return <BookNotFound />;
		const cancelURL = book.id ? `/books/${book.id}` : '/books';
		const title = book.id ? `${book.created_at}` : 'New Book';
		return (
			<div>
				<h2>New Book</h2>
				{this.renderErrors()}
				<form className="bookForm" onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="title">
							<strong>Title:</strong>
							<input
								type="text"
								id="title"
								name="title"
								onChange={this.handleInputChange}
								value={book.title}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="description">
							<strong>Description:</strong>
							<textarea
								cols="30"
								rows="10"
								id="description"
								name="description"
								onChange={this.handleInputChange}
								value={book.description}
							/>
						</label>
					</div>
					<div className="form-actions">
						<button type="submit">Save</button>
						<Link to={cancelURL}>Cancel</Link>
					</div>
				</form>
			</div>
		);
	}
}

BookForm.propTypes = {
	book: PropTypes.shape(),
	onSubmit: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
};

BookForm.defaultProps = {
	book: {
		title: '',
		description: '',
	},
};

export default BookForm;
