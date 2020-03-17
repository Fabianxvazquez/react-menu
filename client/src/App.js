import React, { Component } from 'react';
import './App.css';
import ItemForm from "./components/ItemForm"
import Item from "./components/Item"


export default class App extends Component {
  state = {
    items: [],
    showForm: false
  }

  addItem = (item) => {
    axios
    .post("api/items", {
      name: item.name,
    }).then(res => {
      const newArray = [res.data, ...this.state.items];
      this.setState({
        items: newArray
      })
    }).catch(err => {
      console.log(err)
    })
  }

  updateItem = (itemForm, id) => {
    axios
    .put(`/api/items/${id}`, {
      name: itemForm.name
    }).then(res => {
      const newArray = this.state.items.map( update =>{
        if(update.id != id){
          return update
        } return {...update, ...itemForm};
      })
    this.setState({
      items: newArray
    })  
    }).catch(err => {
      console.log(err)
    })
  }

  deleteItem = (id) => {
    axios.delete(`/api/items/${id}`)
      .then (res => {
        const { items } = this.state;
        this.setState({ items: items.filter(i => i.id !== id )})
      })
  }

  renderItems(meal) {
    if (this.state.loading){
      return "loading"
    }
    if (this.state.loadItemError) {
      return (
        <>
        <h2 style={{color: 'red' }}>error</h2>
        <h3>{this.state.errorStatusCode}</h3>
        <p> {this.state.toString()}</p>
        </>
      )
    }
    return this.state.items.map( item => {
      return (
        <Item 
        key={`item-${item.id}`}{...item} 
        id={item.id} 
        deleteItem={this.deleteItem} 
        updateItem={this.updateItem} 
        />
      );
    });
  }

  // updateMeal() {

  // }


  componentDidMount() {
    axios
    .get('api/items')
    .then(res => {
      this.setState({
        loading: false,
        items: res.data
      })
    }).catch(error => {
      this.setState({
        loadItemError: true,
        errorStatusCode: error.toString()
      })
    })
  }
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };
  _handleSelector = e => {
    let { name, value } = e.target;
    this.setState({
      [name] : value
    })
    
  }

  render () {
    const { showForm } = this.state
  return (
    <Container>
      <div>
        Allergys Info:
        <br />
        GF: Gluten Free
        <br />
        V: Vegan
        <br />
        VEG: Vegetarian
        <br />
        NF: Nut Free <br />
        DF: Dairy Free <br />
        SF: Soy Free
      </div>
      <div className="App">
        <Form.Select
        fluid
        name='meal'
        label='Pick Menu'
        options={this.state.meals}
        placeholder="Which Menu?"
        onChange={this.handleSelector}
        value={this.state.mealPicker}
        />
        <div onClick={this.toggleForm}>{showForm ? "hide": "new"}</div>
        {showForm ? <ItemForm addItem={this.addItem} /> : null}

        {this.renderItems()}
      </div>
    </Container>
  );
  }
}
