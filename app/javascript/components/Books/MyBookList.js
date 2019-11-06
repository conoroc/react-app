import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MyBookList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
		};

		this.searchInput = React.createRef();
		this.renderEvents = this.renderEvents.bind(this);
		this.updateSearchTerm = this.updateSearchTerm.bind(this);
	}

	updateSearchTerm() {
		this.setState({ searchTerm: this.searchInput.current.value });
	}

	matchSearchTerm(obj) {
		debugger
		const { id, user_id, created_at, updated_at, ...rest } = obj;
		const { searchTerm } = this.state;

		return Object.values(rest).some(
			value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
		);
	}

	renderEvents() {
		const { activeId, books } = this.props;
		const filteredBooks = books
			.filter(el => this.matchSearchTerm(el))
			.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		return filteredBooks.map(book => (
			<li key={book.id}>
				<Link
					to={`/books/${book.id}`}
					className={activeId === book.id ? 'active' : ''}
				>
					{book.title}
				</Link>
			</li>
		));
	}

	render() {
		return (
			<section className="bookList">
				<h2>
					Books
					<Link to="/books/new">New Book</Link>
				</h2>
				<input
					className="search"
					placeholder="Search"
					type="text"
					ref={this.searchInput}
					onKeyUp={this.updateSearchTerm}
				/>
				<ul>{this.renderEvents()}</ul>
			</section>
		);
	}
}

MyBookList.propTypes = {
	activeId: PropTypes.number,
	books: PropTypes.arrayOf(PropTypes.object),
};

MyBookList.defaultProps = {
	activeId: undefined,
	books: [],
};

export default MyBookList;
