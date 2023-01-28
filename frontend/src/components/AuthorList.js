import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class AuthorList extends Component {
  static displayName = AuthorList.name;

  constructor(props) {
    super(props);
    this.state = { authors: [], loading: true };
  }

  componentDidMount() {
    this.populateAuthorsData();
  }

  static renderTable(authors) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full name</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author =>
            <tr key={author.fullName}>
               <td>{author.id}</td>
              <td>{author.fullName}</td>
              <td><Link to={'/author_create_update/' + author.id}> Update </Link></td>

            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : AuthorList.renderTable(this.state.authors);

    return (
      <div>
        <h1 id="tabelLabel" >Authors</h1>      
        {contents}
      </div>
    );
  }

  async populateAuthorsData() {
    const response = await fetch('/api/author');
    console.log(response);
    const data = await response.json();    
    this.setState({ authors: data, loading: false });
  }
}
