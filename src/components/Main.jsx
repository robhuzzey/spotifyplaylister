import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'
import Player from '../containers/Player'

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
    return (
      <Grid>
        <Row>
          <Col sm={12} md={12}>
            <Grid>
              <Row>
                <Col sm={12} md={7}>
                  <h1>Spotify Playlister</h1>
                </Col>
                <Col sm={12} md={5}>
                  <Player />
                </Col>
              </Row>
            </Grid>
            <Authenticate>
              <Tabs defaultActiveKey={this.state.index} activeKey={this.state.index} onSelect={this.handleChangeIndex} id="controlled-tab-example">
                <Tab eventKey={0} title="Tracks">
                  <UserTracks />
                </Tab>
                <Tab eventKey={1} title="Seeds">
                  <Seeds />
                </Tab>
                <Tab eventKey={2} title="Suggestions">
                  <Recommendations />
                </Tab>
              </Tabs>
            </Authenticate>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Main
