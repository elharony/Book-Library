import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import escapeStringRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from "./Book";

class SearchBook extends Component {

    // State Management
    state = {
        query: '',
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }
    updateQuery = (query) => {
        this.setState({ query })
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
                            <Book thisBook={book}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook