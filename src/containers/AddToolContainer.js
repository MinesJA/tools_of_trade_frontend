import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTool } from '../actions/toolsActions'
import TagDropdown from '../components/TagDropdown'
import { Form, Container } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class AddToolContainer extends Component {
  state = {
      name: "",
      url: "",
      description: "",
      tags: []
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let tool = Object.assign({}, this.state, {author_id: this.props.currentUser.id})

    this.props.addTool(tool)
    this.props.history.push("/")
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  setTags = (tags) => {
    this.setState({
      tags
    }, ()=>{console.log("AddToolContainer:", this.state)})
  }

  render() {
    return (
      <Container style={{padding: "15px"}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input label="Name of Tool" placeholder='React.js' name='name' value={this.state.name} onChange={this.handleChange} />
            <Form.Input label='Tool Homepage' placeholder='toolsite.com' name='url' value={this.state.url} onChange={this.handleChange} />
          </Form.Group>

          <Form.TextArea label='Description of Tool' name='description' placeholder='React.js is super duper...' onChange={this.handleChange} />

          <TagDropdown handleChange={this.handleChange} setTags={this.setTags} chosenTags={this.state.tags} allowAdditions={true}/>

          <Form.Button style={{marginTop: "10px"}}>Submit</Form.Button>

        </Form>
      </Container>
    )
  }
}


function mapStateToProps(state){
  return {currentUser: state.Users.currentUser}
}

function mapDispatchToProps(dispatch){
  return{
    addTool: (tool) => {
      dispatch(addTool(tool))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddToolContainer));
