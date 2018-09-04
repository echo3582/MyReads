import React, { Component } from 'react'

class Book extends Component {
	handleChange = (event, book) => {
		this.props.onHandleChange(book, event.target.value)
	}
	render() {
		return(
			<li key={this.props.id}>
		      <div className="book">
		        <div className="book-top">
		          <div className="book-cover" style={{ width: 128, height:193, backgroundImage: `url(${this.props.img})`}}>
		          </div>
		          <div className="book-shelf-changer">
		          <select value={this.props.shelf} onChange={(event) => this.handleChange(event, this.props.book)}>                             
		            <option value="move" disabled>Move to...</option>
		            <option value="currentlyReading">Currently Reading</option>
		            <option value="wantToRead">Want to Read</option>
		            <option value="read">Read</option>
		            <option value="none">None</option>
		          </select>
		        </div>
		        </div>
		      </div>
		    </li>
		)	
	}
}

export default Book