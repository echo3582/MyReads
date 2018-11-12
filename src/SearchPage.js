import React from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import PropTypes from 'prop-types'

const SearchPage = (props) => {
  const { query, searchedBooks, defaultImg, onHandleChange, onSearchBooks } = props

  const handleChange = (query) => {
    onSearchBooks(query)
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            placeholder="Search by title or author" 
            value={query}
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
                query={query}
              />
            ))}
        </ol>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
  searchedBooks: PropTypes.array.isRequired
}

export default SearchPage