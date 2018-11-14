import React, { Component } from 'react'

class Book extends Component {
	constructor (props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	render () {
		const { id, img, shelf, book, onHandleChange, title, author } = this.props
		const handleChange = (event, book) => {
			onHandleChange(book, event.target.value)
			this.setState({loading: true})
		}
		const bookCoverStyle = {
			width: 128, 
			height:193, 
			backgroundImage: `url(${img})`
		}
		return(
			<li key={id}>
		      <div className="book">
		        <div className="book-top">
		          <div className="book-cover" style={bookCoverStyle}>
		          </div>
		          <div className={this.state.loading ? "loading book-shelf-changer" : "book-shelf-changer" }>
			          <select value={shelf} onChange={(event) => handleChange(event, book)}>
			          	<option value="move" disabled>Move to...</option>
			            <option value="currentlyReading">Currently Reading</option>
			            <option value="wantToRead">Want to Read</option>
			            <option value="read">Read</option>
			            <option value="none">None</option>
			          </select>
		          </div>
		        </div>
		        <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
		      </div>
		    </li>
		)
	}
}

export default Book