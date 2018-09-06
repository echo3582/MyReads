import React, { Component } from 'react'
import Book from './book'
import PropTypes from 'prop-types'

class Part extends Component {
  	static propTypes = {
    	books: PropTypes.array.isRequired
  	}
	render() {
		return(
			<div className="bookshelf">
	          <h2 className="bookshelf-title">{this.props.partTitle}</h2>
	          <div className="bookshelf-books">
	          	<ol className="books-grid">
	              {this.props.books.map((book) => (
	              	<Book
	              		key={book.id}
	              		id={book.id}
	              		shelf={book.shelf}
	              		img={book.imageLinks ? book.imageLinks.smallThumbnail : this.props.defaultImg}
	              		onHandleChange={this.props.onHandleChange}
	              		book={book}
	              	/>
	              ))}
	            </ol>
	          </div>
	        </div>
		) 
	}
}

export default Part 