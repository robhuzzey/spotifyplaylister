import React from 'react'
import { connect } from 'react-redux'
import { changePage } from '../actions/navigation'
import UserTracks from './UserTracks'
import Recommendations from './Recommendations'
import Authenticate from './Authenticate'
import Player from './Player'

import {Navbar, Nav, NavItem, Badge} from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.navigation.page,
    seedCount: state.seeds.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: pagename => {
      dispatch(changePage(pagename))
    }
  }
}

const Main = props => (
  <div>
    <Navbar fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Spotify Playlister</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeKey={props.page}>
          <NavItem eventKey='tracks' onClick={() => props.changePage('tracks')}>1) Tracks</NavItem>
          <NavItem eventKey='recommendations' disabled={props.seedCount < 1} onClick={() => props.changePage('recommendations')}>2) Suggestions</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Authenticate>
      {props.page === 'tracks' && <UserTracks />}
      {props.page === 'recommendations' && <Recommendations />}
    </Authenticate>
    <Navbar fixedBottom>
      <Player />
    </Navbar>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
