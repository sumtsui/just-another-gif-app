import React from 'react';

const randomCards = props =>
  <div className="row">
    {props.cards.map((card, index) => {
      return (
        <div className="col-sm-6 col-md-4 col-xl-3 pl-sm-1 pr-sm-1" key={index}>
        <div className="card bg-light mb-3" key={card.id}>
          <div className="card-header d-flex justify-content-between">
            {(card.isEditing) ?
              <input
                type="text"
                className="form-control"
                value={card.tag}
                onChange={e => props.handleTagChange(e, card.id)}
              />
              :
              <span className="align-self-center" style={{ fontSize: '1.6rem' }}>
                {card.tag}
              </span>
            }
            <button className="btn btn-outline-secondary" type="button" onClick={() => props.handleClick(card.id)}>
              {(card.isEditing) ? 'Done' : 'Edit'}
            </button>
          </div>
          <div className="card-body">
            {(card.isLoading) ? 
            <p>Loading...</p>
            :
              <img
                className="card-img-top"
                src={card.gif.images.fixed_height.url}
                key={card.gif.id}
                alt={card.gif.title}
              />
            }
          </div>
        </div>
        </div>
      ) // end return
    })}
  </div>

export default randomCards;

