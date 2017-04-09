import React from 'react'
import { connect } from 'react-redux'
import { changePage } from '../actions/navigation'
import UserTracks from './UserTracks'
import Recommendations from './Recommendations'
import Seeds from './Seeds'
import Authenticate from './Authenticate'
import Player from './Player'

import { Container, Navbar, Nav, NavItem, Badge, Button, ButtonGroup, Grid, Row, Col} from 'react-bootstrap'

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
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Spotify Playlister</a>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
    <Authenticate>
      <div>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button onClick={() => props.changePage('tracks')}>Tracks</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => props.changePage('seeds')}>Seeds <Badge>{props.seedCount}</Badge></Button>
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button onClick={() => props.changePage('recommendations')}>Recommendations</Button>
          </ButtonGroup>
        </ButtonGroup>
        {props.page === 'tracks' && <UserTracks />}
        {props.page === 'recommendations' && <Recommendations />}
        {props.page === 'seeds' && <Seeds />}
      </div>
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
