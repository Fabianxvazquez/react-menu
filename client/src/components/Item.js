import React, {Component} from 'react'
import { Button, Item } from 'semantic-ui-react'
import ItemForm from "./ItemForm"

handleSubmit = e => {
  console.log(this.props.id);
 
  e.preventDefault();
  if (this.props.id) {
    this.props.updateItem(this.state, this.props.id)
    this.props.toggleForm()
  } else {
    this.props.addItem(this.state)
  }
  this.clearForm()
}

handleChange = e => {
  this.setState({
    [e.target.name]: e.target.value
  })
}
flipBoolean = e => {
  this.setState({
    [e.target.id] : e.target.checked
  })
}
handleSelector = e => {
  this.setState({
    [e.target.name] : e.target.options
  })
}

render() {
  const { meals } = this.state
  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Input
        label="name"
        name="name"
        placeholder="new dish"
        required
        onChange={this.handleChange}
        value={this.state.name}
      />
      <Button type="submit">Submit</Button>
      </Form>
    );
  }

