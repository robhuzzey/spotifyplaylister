import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'
import Player from '../containers/Player'

import {Navbar, Nav, NavItem, Button} from 'react-bootstrap'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.state = {
      page: 'tracks'
    }
  }

  handleChangePage(page) {
    this.setState({
      page
    })
  }

  render() {
    return (
      <div>
        <Navbar fixedTop collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Spotify Playlister</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={this.state.page}>
              <NavItem eventKey='tracks' onClick={() => this.handleChangePage('tracks')}>Tracks</NavItem>
              <NavItem eventKey='seeds' onClick={() => this.handleChangePage('seeds')}>Seeds</NavItem>
              <NavItem eventKey='suggestions' onClick={() => this.handleChangePage('suggestions')}>Suggestions</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Authenticate>
          {this.state.page === 'tracks' && <UserTracks />}
          {this.state.page === 'seeds' && <Seeds />}
          {this.state.page === 'suggestions' && <Recommendations />}
        </Authenticate>
        <Navbar fixedBottom>
          <Player />
        </Navbar>
      </div>
    )
  }
}

export default Main
