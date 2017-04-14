import React from 'react'
import { connect } from 'react-redux'
import { changePage } from '../actions/navigation'
import { set as setModal, toggle as toggleModal } from '../actions/modal'
import UserTracks from './UserTracks'
import Recommendations from './Recommendations'
import Seeds from './Seeds'
import Authenticate from './Authenticate'
import Player from './Player'
import TrackDetails from '../components/TrackDetails.jsx'

import { Modal, Container, Navbar, Nav, NavItem, Badge, Button, ButtonGroup, ButtonToolbar, Grid, Row, Col} from 'react-bootstrap'

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
          <NavItem>
            <Player onClick={track => props.setModal(track.title, <TrackDetails track={track} />)} />
          </NavItem>
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
          </Authenticate>
        </Col>
      </Row>
    </Grid>

    {props.isAuthenticated && (
      <Navbar fixedBottom style={{padding: '5px'}}>
        
        <ButtonGroup justified>
          <ButtonGroup>
            <Button active={props.page === 'tracks'} onClick={() => props.changePage('tracks')}>Tracks</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button active={props.page === 'seeds'} onClick={() => props.changePage('seeds')}>Seeds <Badge>{props.seedCount}</Badge></Button>
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button active={props.page === 'recommendations'} onClick={() => props.changePage('recommendations')}>Recommendations</Button>
          </ButtonGroup>
        </ButtonGroup>
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
