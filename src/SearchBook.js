import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from "./Book";

class SearchBook extends Component {

    // State Management
    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        if(query) {
            this.setState({ query })
            BooksAPI.search(query)
                .then((books) => {
                    this.setState({books})
                })
        } else {
            this.setState({
                query: '',
                books: []
            })
        }
    }

    render() {

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
                        {this.state.books.map((book) => (
                            <Book thisBook={book}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook