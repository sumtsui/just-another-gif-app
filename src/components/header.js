import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props =>
  <header className="App-header">
    <div className="container">
    <h1 className="App-title">
      Just Another Gif App&nbsp;
      <small className="text-muted">
        <a href='https://developers.giphy.com/'>
          with Giphy API
        </a>
      </small>
    </h1>
    <ul className="nav nav-tabs d-flex justify-content-between">
      <li className="nav-item flex-fill">
        <NavLink className="nav-link text-info" to={`/trending`}>Trending</NavLink>
      </li>
      <li className="nav-item flex-fill">
        <NavLink className="nav-link text-info" to={`/random`}>Random</NavLink>
      </li>
      <li className="nav-item flex-fill">
        <NavLink className="nav-link text-info" to={`/search`}>Search</NavLink>
      </li>
    </ul>
    </div>
  </header>

export default Header;