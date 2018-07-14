    import React, {Component} from 'react'
    import * as BooksAPI from './BooksAPI'
    import SearchBook from './SearchBook'
    import ListBooks from './ListBooks'
    import { Route } from 'react-router-dom'
    import './App.css'

    class BooksApp extends Component {
      state = {
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

      render() {
          return (
          <div className="app">
              <Route exact path='/' render={ () => <ListBooks books={this.state.books} showAll={this.showAll()}/> } />
              <Route path='/search' render={ () => <SearchBook/> }/>
          </div>
        )
      }
    }

    export default BooksApp
