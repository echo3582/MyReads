import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf/>
        )}/>
        <Route exact path="/search" render={() => (
          <SearchPage/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
