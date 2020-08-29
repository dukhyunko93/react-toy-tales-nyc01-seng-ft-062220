import React, { Component } from 'react';

class ToyForm extends Component {
  
  state = {
    name: "",
    image: "",
    likes: 0,
  }
  
  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.postToys(this.state)
    .then(resp => resp.json())
    .then(toyObj => this.props.handleSubmit(toyObj))
  }
  
  postToys = (toyObj) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(toyObj)
  }
    return fetch("http://localhost:3000/toys", options)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitHandler} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.inputHandler} value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.inputHandler} value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
