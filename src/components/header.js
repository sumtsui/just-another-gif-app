import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props =>
  <header className="App-header">
    <div className="container">
    <h1 className="App-title">
      Just Another Gif App
      <small className="text-muted"> with Giphy API</small>
    </h1>
    <ul className="nav nav-tabs d-flex justify-content-between">
      <li className="nav-item flex-fill">
        <NavLink className="nav-link" to={`/trending`}>Trending</NavLink>
      </li>
      <li className="nav-item flex-fill">
        <NavLink className="nav-link" to={`/random`}>Random</NavLink>
      </li>
      <li className="nav-item flex-fill">
        <NavLink className="nav-link" to={`/search`}>Search</NavLink>
      </li>
    </ul>
    </div>
  </header>

export default Header;