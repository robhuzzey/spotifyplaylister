import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'
import Controls from '../containers/Controls'
import Player from '../containers/Player'

import SwipeableViews from 'react-swipeable-views'

import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.state = {
      index: 0
    }
  }

  handleChangeIndex(index) {
    this.setState({
      index
    })
  }

  render() {
    const {
      index,
    } = this.state;
    return (
      <Grid>
        <Row>
          <Col sm={12} md={12}>
            <h1>Spotify Playlister</h1>
            <Controls />
            <Player />
            <Authenticate>
              <Tabs defaultActiveKey={index} onSelect={this.handleChangeIndex} id="controlled-tab-example">
                <Tab eventKey={0} title="User tracks" />
                <Tab eventKey={1} title="Seeds" />
                <Tab eventKey={2} title="Recommendations" />
              </Tabs>
              <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                <UserTracks />
                <Seeds />
                <Recommendations />
              </SwipeableViews>
            </Authenticate>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Main
