import React, { Component } from 'react';
import Gifs from './gifs';

class SearchResult extends Component {
  
  componentDidMount() {
    this.props.getData(this.props.match.params.q);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.q !== this.props.match.params.q) {
      this.props.getData(nextProps.match.params.q);
    }
  }

  render() {
    return (
      <div>
        {(this.props.loadingResult) ?
          <div className='loader'></div> :
          <Gifs
            result={this.props.result}
            query={this.props.match.params.q}
          />
        }
      </div>
    )
  }
}


export default SearchResult;