import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Trending from './components/trending';
import Random from './components/random';
import SearchForm from './components/searchForm';
import SearchResult from './components/searchResult';
const APIKey = process.env.REACT_APP_APIKey;
// const APIKey = require('./config');

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      loadingResult: false,
      trending: [],
      loadingTrending: true,
      query: ''
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
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${q}&limit=12`)
      .then(res => res.json())
      .then(res => res.data)
      .then(gifs => this.setState({
        result: gifs,
        loadingResult: false
      }))
      .catch(e => console.log(e));
  }

  getTrending = () => {
    this.setState({ loadingTrending: true });
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${APIKey}&limit=12`)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data);
        return res.data;
      })
      .then(gifs => this.setState({
        trending: gifs,
        loadingTrending: false
      }))
      .catch(e => console.log(e));
  }

  getQuery = e => {
    this.setState({
      query: e.target.value
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
              <Random APIKey={APIKey} />
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

export default App;
