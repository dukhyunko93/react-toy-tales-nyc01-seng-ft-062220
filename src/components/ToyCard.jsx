import React, { Component } from 'react';

class ToyCard extends Component {

  handleLikes = () => {
    this.props.patchLikes(this.props.toy)
  }

  handleDonation = () => {
    this.props.deleteToy(this.props.toy)
  }
  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p> {this.props.toy.likes} Likes </p>
        <button onClick={this.handleLikes} className="like-btn">Like {"<3"} </button>
        <button onClick={this.handleDonation} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
