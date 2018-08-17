import React, { Component } from 'react';
import Gifs from './gifs';

class Trending extends Component {
  componentDidMount() {
    this.props.getTrending();
  }
  
  render() {
    return (
      (this.props.loadingTrending) ? 
      <div className='loader'></div> :
      <Gifs result={this.props.trending} />
    )
  }
}

export default Trending;