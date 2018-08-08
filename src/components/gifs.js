import React from 'react';

const Gifs = props =>
  <div className="gifs">
    {(!props.query) || <h3 className="p-2">{props.query.toUpperCase()}</h3>}
    <div className="row">
    {props.result.map(gif =>
      <img
        className="col-sm-6 col-md-4 h-100 pl-sm-1 pr-sm-1"
        src={gif.images.fixed_height.url}
        key={gif.id}
        alt={gif.title}
      />
    )}
    </div>
  </div>

export default Gifs;