import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookNotFound from '../BookNotFound'

const Book = ({ book, onDelete }) => {
	if (!book) return <BookNotFound />

	return (
		<div className="bookContainer">
			<h2>
				{book.title}
				<Link to={`/books/${book.id}/edit`}>Edit</Link>
				<button
					className="delete"
					type="button"
					onClick={() => onDelete(book.id)}
				>
					Delete
				</button>
			</h2>
			<ul>
				<li>
					<strong>Description:</strong> {book.description}
				</li>
			</ul>
		</div>
	)
}

Book.propTypes = {
	book: PropTypes.shape(),
}

Book.defaultProps = {
	book: undefined,
}

export default Book
