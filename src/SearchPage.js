import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import * as _ from 'lodash'

class SearchPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      query: '',
      searchedBooks: []
    }
  }

  //Keep the same state between searchPage and shelfPage
  keepSameState (searchedBooks) {
    const shelfBooks = this.props.books
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

  searchedBooks (query) {
    BooksAPI.search(query).then((searchedBooks) => {
      if (Array.isArray(searchedBooks)) {
        this.keepSameState(searchedBooks)
        console.log(searchedBooks)
      } else {
        this.setState({ searchedBooks: []})
      }
    })
    .catch(
      () => alert('Oops, something goes wrong ~~~')
    )
  }

  handleChange (query) {
    this.setState({ query: query })
    this.searchedBooks(query)
  }

  render () {

    const { defaultImg, onHandleChange } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book) => (
                <Book key={book.id}
                  onHandleChange={onHandleChange}
                  book={book}
                  defaultImg={defaultImg}
                />
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage