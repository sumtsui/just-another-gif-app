import React, { Component } from 'react';
import Gifs from './gifs';

class Trending extends Component {
  componentDidMount() {
    this.props.getTrending();
  }
  
  render() {
    return (
      (this.props.loadingTrending) ? 
      <p>Loading...</p> :
      <Gifs result={this.props.trending} />
    )
  }
}

export default Trending;