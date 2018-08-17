import React, { Component } from 'react';

class SearchForm extends Component {
  componentDidMount() {
    this.searchInput.focus();
  }

  render = () =>
    <form className="input-group mb-3 search-field" onSubmit={e => this.props.onSearch(e, this.props.location, this.props.history)}>
      <input
        ref={input => this.searchInput = input}
        type="text"
        className="form-control"
        onChange={e => this.props.getQuery(e)}>
      </input>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="submit" id="button-addon2"><span role="img" aria-label="search icon">&#x1f50d;</span></button>
      </div>
    </form>

}

export default SearchForm;