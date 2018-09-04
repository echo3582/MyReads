import React, { Component } from 'react'
import Book from './book'

class Part extends Component {
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
	              		img={book.imageLinks.smallThumbnail}
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