import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchedBooks: [],
    //when books have no background image , use this.
    defaultImg: "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {this.setState({ books })
    })
  }

  onUpdate(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(res => BooksAPI.getAll())
    .then((books) => {
      this.setState({ books })
    })  
  }

  searchBooks = (query) => {
    this.setState({ query: query })
    BooksAPI.getAll().then((books) => this.setState( {books}))
    const shelfBooks = this.state.books 
    BooksAPI.search(query).then((searchedBooks) => {
      //when query is null set searchBooks array
      if (Array.isArray(searchedBooks)) {
      //the book's state is same on both the searchPage and the shelfPage
      const newSearchedBooks = searchedBooks.map(searchedBook => {
          const serchedBookInShelf = shelfBooks.find(
            shelfBook => shelfBook.id === searchedBook.id
          );

          return {
            ...searchedBook,
            shelf: serchedBookInShelf ? serchedBookInShelf.shelf : "none"
          }

        })
        this.setState({ searchedBooks: newSearchedBooks })
      } else {
        this.setState({ searchedBooks: []})
      }
    })    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            books={this.state.books}
            defaultImg={this.state.defaultImg}
            onHandleChange={(book, shelf) => this.onUpdate(book, shelf)}
          />
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <SearchPage
            query={this.state.query}
            onSearchBooks={(query) => this.searchBooks(query)}
            defaultImg={this.state.defaultImg}
            searchedBooks={this.state.searchedBooks}
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

