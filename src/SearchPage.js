import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import PropTypes from 'prop-types'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }
  render () {
    const { searchedBooks, defaultImg, onHandleChange, onSearchBooks } = this.props

    const handleChange = (query) => {
      this.setState({ query: query })
      return onSearchBooks(query)
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={this.state.query}
              onChange={(event) => handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book) => (
                <Book
                  key={book.id}
                  id={book.id}
                  shelf={book.shelf}
                  img={book.imageLinks ? book.imageLinks.smallThumbnail : defaultImg}
                  onHandleChange={onHandleChange}
                  book={book}
                  title={book.title}
                  author={book.authors ? book.authors[0] : ""}
                />
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  searchedBooks: PropTypes.array.isRequired
}

export default SearchPage