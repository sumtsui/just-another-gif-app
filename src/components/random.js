import React, { Component } from 'react';
import RandomCards from './randomCards';

class Random extends Component {
  constructor() {
    super();
    this.state = {
      cards: [
        {
          isEditing: false,
          id: 0,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          id: 1,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          id: 2,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          id: 3,
          gif: {},
          isLoading: true,
        },
      ]
    }
  }

  componentDidMount() {
    this.props.cardTags.forEach((tag, i) => {
      this.getRandom(tag, i);
    });
  }

  handleClick = id => {
    this.setState({
      cards: this.state.cards.map(i => {
        if (i.id === id) {
          return {
            ...i,
            isEditing: !i.isEditing
          }
        }
        return i;
      })
    });
    // still need work
    if (this.state.cards[id].isEditing === true) this.getRandom(this.state.cards[id].tag, id);
  }

  getRandom = (tag, id) => {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${this.props.APIKey}&tag=${tag}`)
      .then(res => res.json())
      .then(res => res.data)
      .then(gif => {
        return {
          ...this.state.cards[id],
          gif: gif,
          isLoading: false
        }
      })
      .then(card => {
        return this.state.cards.map(i => {
          if (i.id === id) {
            i = card
          }
          return i;
        });
      })
      .then(cards => this.setState({ cards }))
      .catch(e => console.log('error getting gifs'));
  }

  render() {
    return (
      <RandomCards
        cards={this.state.cards}
        tags={this.props.cardTags}
        handleClick={this.handleClick}
        handleTagChange={this.props.handleTagChange}
      />
    )
  }
}
  
export default Random;