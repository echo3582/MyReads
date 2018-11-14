import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import sortBy from 'sort-by'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchedBooks: [],
    //when books have no background image , use defaultImg.
    defaultImg: "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
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

  //Keep the same state between searchPage and shelfPage
  keepSameState = (searchedBooks) => {
      const shelfBooks = this.state.books 
      let newSearchedBooks = searchedBooks.map(searchedBook => {
          const serchedBookInShelf = shelfBooks.find(
            shelfBook => shelfBook.id === searchedBook.id
          );
          return {
            ...searchedBook,
            shelf: serchedBookInShelf ? serchedBookInShelf.shelf : "none"
          }
        })
      newSearchedBooks = newSearchedBooks.sort(sortBy('title'))
      this.setState({ searchedBooks: newSearchedBooks })  
  }

  searchBooks = (query) => {
    this.setState({ query: query })
    // this.getBookList();
    BooksAPI.search(query).then((searchedBooks) => {
      if (Array.isArray(searchedBooks)) {
        this.keepSameState(searchedBooks)
      } else {
        this.setState({ searchedBooks: []})
      }
    })
    .catch(
      () => alert('Oops, something goes wrong ~~~')
    )
  }

  render() {
    const { books, defaultImg, query, searchedBooks } = this.state
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
            query={query}
            onSearchBooks={(query) => this.searchBooks(query)}
            defaultImg={defaultImg}
            searchedBooks={searchedBooks}
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