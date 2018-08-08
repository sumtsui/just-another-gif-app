import React, { Component } from 'react';
import RandomCards from './randomCards';

class Random extends Component {
  constructor() {
    super();
    this.state = {
      cards: [
        {
          isEditing: false,
          tag: 'Happy',
          id: 0,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          tag: 'Dog',
          id: 1,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          tag: 'Himym',
          id: 2,
          gif: {},
          isLoading: true,
        },
        {
          isEditing: false,
          tag: 'Cat',
          id: 3,
          gif: {},
          isLoading: true,
        },
      ]
    }
  }

  componentDidMount() {
    this.state.cards.forEach(card => {
      this.getRandom(card.tag, card.id);
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

  handleTagChange = (e, id) => {
    this.setState({
      cards: this.state.cards.map(i => {
        if (i.id === id) {
          return {
            ...i,
            tag: e.target.value
          }
        }
        return i;
      })
    })
  }

  getRandom = (tag, id) => {
    fetch(`http://api.giphy.com/v1/gifs/random?api_key=${this.props.APIKey}&tag=${tag}`)
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
      .catch(console.log)
  }

  render() {
    return (
      <RandomCards
        cards={this.state.cards}
        handleTagChange={this.handleTagChange}
        handleClick={this.handleClick}
      />
    )
  }
}
  
export default Random;