import React, { Component } from 'react'

class Book extends Component {

	constructor (props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	render () {
		const { book, onHandleChange, defaultImg } = this.props
		const handleChange = (event, book) => {
			onHandleChange(book, event.target.value)
			this.setState({loading: true})
		}
		const bookCoverStyle = {
			width: 128, 
			height:193, 
			backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : defaultImg})`
		}
		const options = [
			{value: "move", text: "Move to..."},
			{value: "currentlyReading", text: "Currently Reading"},
			{value: "wantToRead", text: "Want to Read"},
			{value: "read", text: "Read"},
			{value: "none", text: "None"},
		]

		return (
			<li>
		      <div className="book">
		        <div className="book-top">
		          <div className="book-cover" style={bookCoverStyle}>
		          </div>
		          <div className={this.state.loading ? "loading book-shelf-changer" : "book-shelf-changer"}>
			          <select value={book.shelf} onChange={(event) => handleChange(event, book)}>
			          	{options.map((opt) => 
			          		opt.value === "move" ? 
			          		<option key={opt.value} value={opt.value} disabled>{opt.text}</option> 
			          		: <option key={opt.value} value={opt.value}>{opt.text}</option> )}
			          </select>
		          </div>
		        </div>
		        <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors[0] : ""}</div>
		      </div>
		    </li>
		)
	}
}

export default Book