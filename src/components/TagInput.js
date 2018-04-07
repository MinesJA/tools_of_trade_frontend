import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addTags } from '../actions/tagsActions'

class TagInput extends Component {
  state = {
    searchQuery: null
  }

  componentDidMount(){
    console.log("TagInput Mounted, incoming tags: ", this.props.tags)
  }

  handleChange = (e, { value }) => {
    value.map((value)=>{
      let tag = value.toLowerCase()
      {!this.props.tags.includes(tag) ? this.props.addTags(tag) : null }
    })
    this.props.setTags(value)
  }

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({
      searchQuery
    })
  }

  renderOptions = () => {
    // takes an array of tags as strings from store and turns into objects
    return this.props.tags.map((tag)=>{
      let newTag = tag.replace(/ /g,"_");
      return {"key": tag, "text": tag, "value": newTag}
    })
  }

  render(){
    return(
      <Dropdown
        selection
        allowAdditions={true}
        multiple={true}
        search={true}
        options={this.renderOptions()}
        value={this.props.chosenTags}
        placeholder='Add tags'
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
      />
    )
  }
}



function mapStateToProps(state){
  return {
    tags: state.tags
  }
}

function mapDispatchToProps(dispatch){
  return {
    addTags: (tag)=>{ dispatch(addTags(tag))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagInput);
