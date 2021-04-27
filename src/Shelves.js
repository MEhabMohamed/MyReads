import React, {Component} from 'react'

class Shelves extends Component {
    render() {
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.definition}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter((b) => b.shelf === this.props.shelf).map((b) => {
                        return <li key={b.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (b.imageLinks === undefined ? "No Image There" : `url(${b.imageLinks.smallThumbnail})`) }}></div>
                            <div className="book-shelf-changer">
                              <select value={b.shelf} onChange={(event) => this.props.update(b, event.target.value)}>
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
        )
    }
}

export default Shelves