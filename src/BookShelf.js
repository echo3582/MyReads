import React from 'react'
import { Link } from 'react-router-dom'
import Part from './part'

const BookShelf = (props) => {

  const { books, onHandleChange, defaultImg } = props
  const partList = [
    {partTitle: "Currently Reading", value: 'currentlyReading'},
    {partTitle: "Want to Read", value: 'wantToRead'},
    {partTitle: "Read", value: 'read'}
  ]
  
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {partList.map((part) => <Part 
            key={part.value}
            partTitle={part.partTitle}
            books={books.filter((book) => book.shelf === part.value)}
            onHandleChange={onHandleChange}
            defaultImg={defaultImg}
          />)}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default BookShelf