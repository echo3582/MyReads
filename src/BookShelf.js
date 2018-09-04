import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Part from './part'

class BookShelf extends Component {
  state = {
    partList:[
      {partTitle: "Currently Reading", value: 'currentlyReading'},
      {partTitle: "Want to Read", value: 'wantToRead'},
      {partTitle: "Read", value: 'read'}        
    ]
  }
	render() {
		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {this.state.partList.map((part) => <Part 
                key={part.value}
                partTitle={part.partTitle}
                books={this.props.books.filter((book) => book.shelf === part.value)}
                onHandleChange={this.props.onHandleChange}
              />)}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default BookShelf