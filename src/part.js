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
	              		img={book.imageLinks.smallThumbnail}
	              	/>
	              ))}
	            </ol>
	          </div>
	        </div>
		) 
	}
}

export default Part 