import React from 'react';
import ToyCard from './ToyCard'
import ToyForm from './ToyForm'

class ToyContainer extends React.Component {

  state = {
    display: false,
    toys: []
  }

  getToys = () => {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyObjs => {
      this.setState({toys: toyObjs})
    })
  }
  
  componentDidMount(){
    this.getToys()
  }

  handleSubmit = (toyObj) => {
    this.setState({ display: false, toys: [...this.state.toys, toyObj]})
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  patchLikes = (toyObj) => {
    toyObj.likes += 1

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        likes: parseInt(toyObj.likes)
      })
    }

    fetch(`http://localhost:3000/toys/${toyObj.id}`, options)
    .then(res => res.json())
    .then(updatedToy => {
      let newArray = this.state.toys.filter(toy => toy.id !== updatedToy.id)
      newArray = [...newArray, toyObj ]
      this.setState({
        toys: newArray.sort(function(a,b){return a.id - b.id})
      })
    })
  }

  deleteToy = (toyObj) => {
    const options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }

    fetch(`http://localhost:3000/toys/${toyObj.id}`, options)
    .then(res => res.json())
    .then( () => {
      let newArray = this.state.toys.filter(toy => toy.id !== toyObj.id)
      this.setState({
        toys: newArray
      })
    })
  }

  renderToys = () => this.state.toys.map( toyObj => <ToyCard key={toyObj.id} toy={toyObj} patchLikes={this.patchLikes} deleteToy={this.deleteToy} />)

  render() {
    return(
      <>
        { this.state.display ? <ToyForm handleSubmit={this.handleSubmit }/> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <div id="toy-collection">
            { this.renderToys() }
        </div>
      </>
    );
  }
}

export default ToyContainer;
