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
    // this.props.cardTags.forEach((tag, i) => {
    //   this.getRandom(tag, i);
    // });
    this.getRandom(this.props.cardTags[0], 0);
    this.getRandom(this.props.cardTags[1], 1);
    this.getRandom(this.props.cardTags[2], 2);
    this.getRandom(this.props.cardTags[3], 3);
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
    if (this.state.cards[id].isEditing === true) {
      this.getRandom(this.props.cardTags[id], id);
    }
  }

  getRandom = (tag, id) => {
    let arr = this.state.cards;
    arr[id] = {
      ...arr[id],
      isLoading: true,
      isEditing: false
    };
    this.setState({ cards: arr });
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
        arr[id] = card;
        return arr;
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