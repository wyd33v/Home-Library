import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

export class BookCreateUpdate extends Component {
    static displayName = BookCreateUpdate.name;



	constructor(props) {
		super(props);
		this.state = {id : null, name: '', loading: true , authorId: 1, authors: []};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;
       this.setState({
         [name]: value
       });
     }

   async handleSubmit(event) {
        event.preventDefault();
        var data = new FormData();
        data.append( "id", this.state.id);
        data.append( "name", this.state.name);
         data.append( "authorId", this.state.authorId);
        await fetch('/api/book', {
           method: (this.state.id) ? 'PUT' : 'POST',
           body: data,
        });
        this.props.history.push('/books');
   }

	componentDidMount() {
		this.populateBooksData();
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: (
                  <div>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="form-group  mb-4">
                        <Label for="name">Name</Label>
                          <Input type="text" className="form-control" name="name" id="name" value={this.state.name}
                                 onChange={this.handleInputChange} autoComplete="name"/>
                    </div>

                     <div className="form-group mb-4">
                            <Label for="authorId">Author</Label>
                           <select className="form-control"  value={this.state.authorId} name="authorId" onChange={this.handleInputChange}>
                          {
                              this.state.authors.map(author => <option key={author.id} value={author.id}>{author.fullName}</option>)
                          }
                          </select>
                    </div>
                          <Button color="primary" type="submit" className="btn btn-primary mb-4">Save</Button>{' '}
                          <Button color="secondary" tag={Link} to="/books">Cancel</Button>
                  </Form>

                  </div>
            );
        const title = <h2>{this.state.id ? 'Edit Book' : 'Add Book'}</h2>;
		return (
			<div>
			    {title}
				{contents}
			</div>
		);
	}

	async populateBooksData() {
    	    if (this.props.match.params.id) {
                const book = await (await fetch(`/api/book/${this.props.match.params.id}`)).json();
                this.setState({id : book.id,  name: book.name, authorId: book.author.id});
                console.log(book);
            }
            const authors = await (await fetch('/api/author')).json();
            this.setState({ loading: false, authors : authors });
    	}




}



 //   "proxy": "http://localhost:8080/"