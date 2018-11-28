import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'

class BooksApp extends React.Component { 
  
  constructor (props) {   
    super(props)
    this.state = {
      books: []
    }
  }

  getBookList() {
    BooksAPI.getAll().then(books => this.setState({ books }))
    .catch(
      () => alert('Oops, failed to get the book list')
    )
  }

  componentDidMount() {
    this.getBookList()
  }

  onUpdate(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(res => this.getBookList(res))
    .catch(
      () => alert('Oops, failed to change the shelf of this book')
    )
  }

  render() {
    const { books } = this.state
    //when books have no background image , use defaultImg.
    const defaultImg = "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            books={books}
            defaultImg={defaultImg}
            onHandleChange={(book, shelf) => this.onUpdate(book, shelf)}
          />
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <SearchPage
            books={books}
            defaultImg={defaultImg}
            onHandleChange={(book, shelf) => {
              this.onUpdate(book, shelf) 
              history.push("/")
            }}          
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp