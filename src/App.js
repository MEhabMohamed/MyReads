import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    search: [],
  }
  
  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    query !== '' && BooksAPI.search(query).then((books) => {this.setState(() => ({search: books}))})
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState(() => ({books: books}))
  }
  
  updateShelf = (book, shelf) => {
    const newShelf = async() => await BooksAPI.update(book, shelf)
    try {
      newShelf().then(() => BooksAPI.getAll()
      .then((books) => this.setState(() => ({books: books}))))
    } catch(error) {
      console.log('error', error)
    }
  }

  shelfValue = (b) => {
    return b.id !== this.state.books.filter(c => b.id === c.id).map(c => c.id).toLocaleString() ? 'none' : this.state.books.filter(c => b.id === c.id).map(c => c.shelf).toLocaleString()
  }
    
  render() {
    const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'].map(v => v.toLowerCase())
    const showingResults = this.state.query !== '' && (this.state.search !== (null || undefined)) ? this.state.search : null
    return (
      <Router>
      <div className="app">
        <Switch>
        <Route path='/search'>
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <p>{`Available search categories, please use your favorite: `}{searchTerms.map((i) => {return <button key={i}>{i}</button>})}</p>
              <ol className="books-grid">
                {(this.state.search !== undefined || null) && showingResults !== null ? showingResults.map((b) => {
                  return <li key={b.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (b.imageLinks === undefined ? "No Image There" : `url(${b.imageLinks.smallThumbnail})`) }}></div>
                      <div className="book-shelf-changer">
                        <select value={this.shelfValue(b)} onChange={(event) => this.updateShelf(b, event.target.value)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{b.title}</div>
                    <div className="book-authors">{b.authors === undefined ? ['Unknown Author'] : b.authors.length > 1 ? `${b.authors.map(m => m)}` : `${b.authors[0]}`}</div>
                  </div>
                </li>
                }) : null}
              </ol>
            </div>
          </div>
          </Route>
         <Route exact path='/'>
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
                      {this.state.books.filter((b) => b.shelf === "currentlyReading").map((b) => {
                        return <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (b.imageLinks === undefined ? "No Image There" : `url(${b.imageLinks.smallThumbnail})`) }}></div>
                            <div className="book-shelf-changer">
                              <select value={b.shelf} onChange={(event) => this.updateShelf(b, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.authors === undefined ? ['Unknown Author'] : b.authors.length > 1 ? `${b.authors.map(m => m)}` : `${b.authors[0]}`}</div>
                        </div>
                      </li>
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter((b) => b.shelf === "wantToRead").map((b) => {
                        return <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (b.imageLinks === undefined ? "No Image There" : `url(${b.imageLinks.smallThumbnail})`) }}></div>
                            <div className="book-shelf-changer">
                              <select value={b.shelf} onChange={(event) => this.updateShelf(b, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.authors === undefined ? ['Unknown Author'] : b.authors.length > 1 ? `${b.authors.map(m => m)}` : `${b.authors[0]}`}</div>
                        </div>
                      </li>
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter((b) => b.shelf === "read").map((b) => {
                        return <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (b.imageLinks === undefined ? "No Image There" : `url(${b.imageLinks.smallThumbnail})`) }}></div>
                            <div className="book-shelf-changer">
                              <select value={b.shelf} onChange={(event) => this.updateShelf(b, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.authors === undefined ? ['Unknown Author'] : b.authors.length > 1 ? `${b.authors.map(m => m)}` : `${b.authors[0]}`}</div>
                        </div>
                      </li>
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
          </Route>
        </Switch>
      </div>
      </Router>
    )
  }
}

export default BooksApp
