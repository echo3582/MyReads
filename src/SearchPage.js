import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired
  }
  handleChange(query) {
    this.props.onSearchBooks(query)
  }
	render() {
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={this.props.query}
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchedBooks.map((book) => (
                <Book
                  key={book.id}
                  id={book.id}
                  shelf={book.shelf}
                  img={book.imageLinks ? book.imageLinks.smallThumbnail : this.props.defaultImg}
                  onHandleChange={this.props.onHandleChange}
                  book={book}
                  query={this.props.query}
                />
              ))}
          </ol>
        </div>
      </div>
		)
	}
}

export default SearchPage