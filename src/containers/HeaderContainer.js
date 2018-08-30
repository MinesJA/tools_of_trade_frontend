import React, { Component, Fragment } from 'react';
import SearchBar from '../components/SearchBar'
import { Segment, Header, Icon } from 'semantic-ui-react'

const HeaderContainer = (props) => (
  <Segment vertical textAlign='center'>
    <Header icon>
      <Icon name='setting' />
      <Header.Content className='logo'>
         Tools of the Trade
      </Header.Content>
    </Header>

    {props.savedTools ?
      <Fragment>
        <Segment basic>
          <Header as='h1' color='blue'>My Saved Tools</Header>
        </Segment>
        
      </Fragment>
        :
      <Fragment>
        <Segment basic />
        <SearchBar />
        <Segment basic />
      </Fragment>}



  </Segment>
)

export default HeaderContainer
