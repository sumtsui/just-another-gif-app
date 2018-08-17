/*
TODO
  - do error handling
  - get loading indicator working properly
*/

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Trending from './components/trending';
import Random from './components/random';
import SearchForm from './components/searchForm';
import SearchResult from './components/searchResult';

let APIKey = '';
try {
  APIKey = (process.env.REACT_APP_APIKEY) || require('./config');
} catch (e) {
  console.log('no config file found');
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      loadingResult: false,
      trending: [],
      loadingTrending: true,
      query: '',
      cardTags: ['Happy', 'Dog', 'Himym', 'Cat']
    }
  }

  onSearch = (e, location, history) => {
    e.target.firstChild.value = '';
    e.preventDefault();

    location.pathname = '/';    // reset url to /search/
    let path = `search/${this.state.query}/`;
    history.push(path);
  }

  getData = (q) => {
    this.setState({ loadingResult: true });
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${q}&limit=12`)
      .then(res => res.json())
      .then(res => res.data)
      .then(gifs => this.setState({
        result: gifs,
        loadingResult: false
      }))
      .catch(e => console.log('error getting gifs'));
  }

  getTrending = () => {
    this.setState({ loadingTrending: true });
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=12`)
      .then(res => res.json())
      .then(res => res.data)
      .then(gifs => this.setState({
        trending: gifs,
        loadingTrending: false
      }))
      .catch(e => console.log('error getting gifs'));
  }

  getQuery = e => {
    this.setState({
      query: e.target.value
    })
  }

  handleRandomTagChange = (e, id) => {
    this.setState({
      cardTags: this.state.cardTags.map(tag => {
        if (this.state.cardTags.indexOf(tag) === id) {
          tag = e.target.value;
        }
        return tag;
      })
      // cardTags: this.state.cardTags.map(tag => {
      //   if (i.id === id) {
      //     return {
      //       ...i,
      //       tag: e.target.value
      //     }
      //   }
      //   return i;
      // })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container App-body">
            <Route exact path="/trending" render={props =>
              <Trending
                {...props}
                loadingTrending={this.state.loadingTrending}
                trending={this.state.trending}
                getTrending={this.getTrending}
              />
            } />
            <Route exact path="/random" render={props =>
              <Random
                APIKey={APIKey}
                cardTags={this.state.cardTags}
                handleTagChange={this.handleRandomTagChange}
              />
            }/>
            <Switch>
              <Route exact path="/search" render={props =>
                <SearchForm
                  {...props}
                  onSearch={this.onSearch}
                  getQuery={this.getQuery}
                />
              } />
              <Route exact path="/search/:q" render={props =>
                <div>
                  <SearchForm
                    {...props}
                    onSearch={this.onSearch}
                    getQuery={this.getQuery}
                  />
                  <SearchResult
                    {...props}
                    loadingResult={this.state.loadingResult}
                    result={this.state.result}
                    getData={this.getData}
                  />
                </div>
              } />
            </Switch>
            <Route exact path="/" render={() => <Redirect to='/trending' /> }/>
          </div>
          <footer>
            <span>sumtsui ☺ {new Date().getFullYear()}</span>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}
