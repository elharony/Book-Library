import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import escapeStringRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBook extends Component {

    // State Management
    state = {
        query: '',
        books: []
    }

    // Return All Books
    showAll = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    // Display All Books When App Loaded
    componentDidMount() {
        this.showAll()
    }

    // Update Book's Shelf
    changeShelf = (book, currentShelf) => {
        BooksAPI.update(book, currentShelf)
            .then(
                (result) => console.log(result)
            )
            .then(this.showAll())
    }

    render() {

        // Displayed Books
        let displayedBooks
        if(this.state.query) {
            const matchedBooks = new RegExp(escapeStringRegExp(this.state.query), 'i')
            displayedBooks = this.state.books.filter((book) => matchedBooks.test(book.title))
        } else {
            displayedBooks = this.state.books
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {displayedBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(e) => this.changeShelf(book, e.target.value)}>
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
        )
    }
}

export default SearchBook