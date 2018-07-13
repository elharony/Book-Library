    import React, {Component} from 'react'
    import * as BooksAPI from './BooksAPI'
    import SearchBook from './SearchBook'
    import { Link } from 'react-router-dom'
    import { Route } from 'react-router-dom'
    import './App.css'

    class BooksApp extends Component {
      state = {
        books: []
      }

      // Return All Books
        componentDidMount() {
          BooksAPI.getAll().then((books) => {
              this.setState({books})
          })
        }

      render() {
        return (
          <div className="app">
              <Route exact path='/' render={ () => (
                  <div className="list-books">

                      <div className="list-books-title">
                          <h1>MyReads</h1>
                      </div>

                      <div className="list-books-content">

                          <div>

                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Currently Reading</h2>
                                  <div className="bookshelf-books">
                                      <ol className="books-grid">
                                          {this.state.books.filter((book) => {return book.shelf === 'currentlyReading'}).map((book) => (
                                              <li key={book.id}>
                                                  <div className="book">
                                                      <div className="book-top">
                                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                          <div className="book-shelf-changer">
                                                              <select>
                                                                  <option value="move" disabled>Move to...</option>
                                                                  <option value="currentlyReading">Currently Reading</option>
                                                                  <option value="wantToRead">Want to Read</option>
                                                                  <option value="read">Read</option>
                                                                  <option value="none">None</option>
                                                              </select>
                                                          </div>
                                                      </div>
                                                      <div className="book-title">{book.title}</div>
                                                      <div className="book-authors">{book.authors.join(', ')}</div>
                                                  </div>
                                              </li>
                                          ))}
                                      </ol>
                                  </div>
                              </div>

                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Want to Read</h2>
                                  <div className="bookshelf-books">
                                      <ol className="books-grid">
                                          {this.state.books.filter((book) => {return book.shelf === 'wantToRead'}).map((book) => (
                                              <li key={book.id}>
                                                  <div className="book">
                                                      <div className="book-top">
                                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                          <div className="book-shelf-changer">
                                                              <select>
                                                                  <option value="move" disabled>Move to...</option>
                                                                  <option value="currentlyReading">Currently Reading</option>
                                                                  <option value="wantToRead">Want to Read</option>
                                                                  <option value="read">Read</option>
                                                                  <option value="none">None</option>
                                                              </select>
                                                          </div>
                                                      </div>
                                                      <div className="book-title">{book.title}</div>
                                                      <div className="book-authors">{book.authors.join(', ')}</div>
                                                  </div>
                                              </li>
                                          ))}
                                      </ol>
                                  </div>
                              </div>

                              <div className="bookshelf">
                                  <h2 className="bookshelf-title">Read</h2>
                                  <div className="bookshelf-books">
                                      <ol className="books-grid">
                                          {this.state.books.filter((book) => {return book.shelf === 'read'}).map((book) => (
                                              <li key={book.id}>
                                                  <div className="book">
                                                      <div className="book-top">
                                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                          <div className="book-shelf-changer">
                                                              <select>
                                                                  <option value="move" disabled>Move to...</option>
                                                                  <option value="currentlyReading">Currently Reading</option>
                                                                  <option value="wantToRead">Want to Read</option>
                                                                  <option value="read">Read</option>
                                                                  <option value="none">None</option>
                                                              </select>
                                                          </div>
                                                      </div>
                                                      <div className="book-title">{book.title}</div>
                                                      <div className="book-authors">{book.authors.join(', ')}</div>
                                                  </div>
                                              </li>
                                          ))}
                                      </ol>
                                  </div>
                              </div>


                          </div>

                      </div>
                      <div className="open-search">
                          <Link to='/search'>Add a book</Link>
                      </div>
                  </div>
              )}/>
              <Route path='/search' render={ () => <SearchBook/> }/>
          </div>
        )
      }
    }

    export default BooksApp
