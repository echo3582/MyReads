import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'


class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {this.setState({ books })
    })
    BooksAPI.getAll().then((books) => {console.log(books)})
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            books={this.state.books}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchPage/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
