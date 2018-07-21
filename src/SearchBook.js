import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from "./Book";

class SearchBook extends Component {

    // State Management
    state = {
        query: '',
        books: [],
        shelvedBooks: []
    }

    // Save The Books that were asigned to a shelf
    showAll = () => {
        BooksAPI.getAll().then((shelvedBooks) => {
            this.setState({shelvedBooks})
        })
    }
    componentWillMount() {
        this.showAll();
    }


    updateQuery = (query) => {
        if(query) {
            this.setState({ query })
            BooksAPI.search(query).then(result => {
                if (!result || result.error) {
                    this.setState({
                        books: []
                    })
                } else {

                    // Search Results
                    result.map((book) => {
                        book.shelf = 'none'
                        this.state.shelvedBooks.map((shelvedBook) => {
                            if(shelvedBook.id === book.id) {
                                book.shelf = shelvedBook.shelf
                            }
                        })
                    })
                    this.setState({books: result})
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            this.setState({
                query: '',
                books: []
            })
        }
    }

    render() {

        const {query, books} = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <h2>{query !== '' ? `${books.length} Books Found!` : ``}</h2>
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book thisBook={book} bookShelf={book.shelf}/>
                        ))}
                    </ol>

                </div>
            </div>
        )
    }
}

export default SearchBook