import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

export class AuthorCreateUpdate extends Component {
    static displayName = AuthorCreateUpdate.name;



	constructor(props) {
		super(props);
		this.state = {id : null, fullName: '', loading: true };
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
        data.append( "fullName", this.state.fullName);
        await fetch('/api/author', {
           method: (this.state.id) ? 'PUT' : 'POST',
           body: data,
        });
        this.props.history.push('/authors');
   }

	componentDidMount() {
		this.populateAuthorsData();
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: (

                  <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <Label for="name">Name</Label>
                          <Input type="text" name="fullName" id="fullName" value={this.state.fullName}
                                 onChange={this.handleInputChange} autoComplete="name"/>
                      </FormGroup>
                      <FormGroup>
                          <Button color="primary" type="submit">Save</Button>{' '}
                          <Button color="secondary" tag={Link} to="/authors">Cancel</Button>
                      </FormGroup>
                  </Form>
            );
        const title = <h2>{this.state.id ? 'Edit Author' : 'Add Author'}</h2>;
		return (
			<div>
			    {title}
				{contents}
			</div>
		);
	}

	async populateAuthorsData() {
    	    if (this.props.match.params.id) {
                const authorFound = await (await fetch(`/api/author/${this.props.match.params.id}`)).json();
                this.setState({id:authorFound.id,  fullName: authorFound.fullName});
            }
            this.setState({ loading: false });
    	}




}



 //   "proxy": "http://localhost:8080/"