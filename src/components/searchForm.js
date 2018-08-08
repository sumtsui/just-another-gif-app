import React from 'react';

const SearchForm = props =>
  <form className="input-group mb-3 search-field" onSubmit={e => props.onSearch(e, props.location, props.history)}>
    <input type="text" className="form-control" onChange={e => props.getQuery(e)}></input>
    <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="submit" id="button-addon2"><span role="img" aria-label="search icon">&#x1f50d;</span></button>
    </div>
  </form>

export default SearchForm;