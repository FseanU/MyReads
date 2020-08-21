import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import HomePage from './HomePage'
import './App.css'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // currentlyReading: [],
    // wantToRead: [],
    // read: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books=>{
      this.setState({
        books
      })
    })
  }

  updateBook = (book, shelf) => {
    console.log("update succeed!")
    console.log(book)
    BooksAPI.update(book, shelf).then(bookIds=>{
      const oldBooks = this.state.books;
      console.log('oldBooks',oldBooks)
      const oldBooksOneLess = oldBooks.filter(b => b !== book )
      console.log('oldBooksOneLess', oldBooksOneLess)
      const updatedBook = {...book};
      console.log(updatedBook)
      updatedBook.shelf = shelf;
      const newBooks = [...oldBooksOneLess,updatedBook];
      // console.log('oldBooksOneLess', oldBooksOneLess)
      console.log('newBooks', newBooks)
      
      this.setState({
        books: newBooks
      })
      console.log(book.shelf)
     
    }

    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage 
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchPage 
            booksInShelf={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>  
      </div>
    )
  }
}

export default BooksApp
