import React from 'react'
import Book from './book'
import PropTypes from 'prop-types'

const Part = (props) => {

  	const { partTitle, books, defaultImg, onHandleChange } = props;

		return(
			<div className="bookshelf">
	          <h2 className="bookshelf-title">{partTitle}</h2>
	          <div className="bookshelf-books">
	          	<ol className="books-grid">
	              {books.map((book) => (
	              	<Book
	              		key={book.id}
	              		id={book.id}
	              		shelf={book.shelf}
	              		img={book.imageLinks ? book.imageLinks.smallThumbnail : defaultImg}
	              		onHandleChange={onHandleChange}
	              		book={book}
	              	/>
	              ))}
	            </ol>
	          </div>
	        </div>
		) 
}

Part.propTypes = {
  	books: PropTypes.array.isRequired
}

export default Part 