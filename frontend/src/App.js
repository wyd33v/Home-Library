import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AuthorList } from './components/AuthorList';
import { BookList } from './components/BookList';
import { AuthorCreateUpdate } from './components/AuthorCreateUpdate';
import { BookCreateUpdate } from './components/BookCreateUpdate';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/books' component={BookList} />
        <Route path='/authors' component={AuthorList} />
        <Route path='/author_create_update/:id?' component={AuthorCreateUpdate} />
        <Route path='/book_create_update/:id?' component={BookCreateUpdate} />

      </Layout>
    );
  }
}
