import React from 'react'

class Book extends React.Component {
  state={
    value: this.props.book.shelf || "none"
  }

  onUpdateBook = (e, book) => {
    const shelf = e.target.value;
    this.props.updateBook(book, shelf)
    this.setState({
      value: shelf
    })
  }

componentDidMount() {
  const {book, booksInShelf} = this.props;
  if (booksInShelf) {
    const bookNeedUpdate = booksInShelf.filter((bInShelf)=> bInShelf.id === book.id );
    bookNeedUpdate.length !== 0 && this.setState({value: bookNeedUpdate[0].shelf}) 
  }
}

  render() {
    const {book} = this.props
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div 
              className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}
            ></div>

            <div className="book-shelf-changer">
              <select 
                onChange={(e) => {
                  this.onUpdateBook(e, book)         
                }}
                value={this.state.value}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{book.title && book.title}</div>
            {book.authors && book.authors.map((author, index)=>(
              <div 
                className="book-authors"
                key={book.id + index}
              >{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

export default Book