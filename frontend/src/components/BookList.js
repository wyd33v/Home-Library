import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { ActionLink } from './ActionLink';

export class BookList extends Component {
  static displayName = BookList.name;

  constructor(props) {
    super(props);
    this.state = { books: [], loading: true };
    this.handleActionLinkDelete = this.handleActionLinkDelete.bind(this);
  }

  componentDidMount() {
    this.populateBooksData();
  }


   handleActionLinkDelete(e, id) {
          e.preventDefault();

        var data = new FormData();
        data.append( "id", id);
          let url = 'api/book';
          fetch(url, {
              method: 'DELETE',
              body: data,
          })
              .then(res => res.text()) // or res.json()
              .then(res => console.log(res));

          // delete from this.state.cars
          const indexToRemove = this.state.books.findIndex((book) => book.id === id);
          this.state.books.splice(indexToRemove, 1);
          this.setState({
              books: this.state.books
          });
      };

  renderTable(books) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>   
            <th>Author</th>
             <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            <tr key={book.name}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author.fullName}</td>
               <td><Link to={'/book_create_update/' + book.id}> </Link></td>
                <td> <ActionLink id={book.id} handleClick={this.handleActionLinkDelete} /> </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderTable(this.state.books);

    return (
      <div>
        <h1 id="tabelLabel" >Books</h1>      
        {contents}
      </div>

    );
  }

  async populateBooksData() {
    const response = await fetch('/api/book');
    const data = await response.json();  
    this.setState({ books: data, loading: false });

  }
}
