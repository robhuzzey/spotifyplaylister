import React from 'react'
import { connect } from 'react-redux'
import { changePage } from '../actions/navigation'
import { set as setModal, toggle as toggleModal } from '../actions/modal'
import UserTracks from './UserTracks'
import Recommendations from './Recommendations'
import Seeds from './Seeds'
import Authenticate from './Authenticate'
import Player from './Player'
import Playlists from './Playlists'
import TrackDetails from '../components/TrackDetails.jsx'
import GlyphText from '../components/GlyphText.jsx'

import { Modal, Container, Glyphicon, Navbar, Nav, NavItem, Badge, Button, ButtonGroup, ButtonToolbar, Grid, Row, Col} from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.navigation.page,
    seedCount: state.seeds.count,
    isAuthenticated: state.authenticate.isAuthenticated,
    showModal: state.modal.show,
    modalTitle: state.modal.title,
    modalBody: state.modal.body
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage: pagename => {
      dispatch(changePage(pagename))
    },
    toggleModal: () => {
      dispatch(toggleModal())
    },
    setModal: (title, body) => {
      dispatch(setModal(title, body))
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
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <Player onClick={track => props.setModal(track.title, <TrackDetails track={track} />)} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Grid>
      <Row>
        <Col xs={12} md={8} mdPush={2}>
          <Authenticate>
            {props.page === 'tracks' && <UserTracks />}
            {props.page === 'recommendations' && <Recommendations />}
            {props.page === 'seeds' && <Seeds />}
            {props.page === 'playlists' && <Playlists />}
          </Authenticate>
        </Col>
      </Row>
    </Grid>

    {props.isAuthenticated && (
      <Navbar fixedBottom id="bottomNavigation">
        <Nav activeKey={props.page}>
          <NavItem eventKey="playlists" onClick={() => props.changePage('playlists')}><GlyphText glyph="th-list" text="Playlists" /></NavItem>
          <NavItem eventKey="tracks" onClick={() => props.changePage('tracks')}><GlyphText glyph="th-list" text="Tracks" /></NavItem>
          <NavItem eventKey="seeds" onClick={() => props.changePage('seeds')}><GlyphText glyph={props.seedCount > 0 ? "heart" : "heart-empty"} text="Likes" /></NavItem>
          <NavItem eventKey="recommendations" onClick={() => props.changePage('recommendations')}><GlyphText glyph="eye-open" text="Discover" /></NavItem>
        </Nav>
      </Navbar>
    )}

    {props.showModal && (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.modalBody}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.toggleModal}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal.Dialog>
    )}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
