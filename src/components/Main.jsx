import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'
import Controls from '../containers/Controls'
import Player from '../containers/Player'

import {Grid, Row, Col} from 'react-bootstrap'

export default (props) => (
  <Grid>
    <Row>
      <Col sm={12} md={12}>
        <h1>Spotify Playlister</h1>
        <Controls />
        <Player />
        <Authenticate>
          <Grid>
            <Row>
              <Col sm={12} md={3}>
                <UserTracks />
              </Col>
              <Col sm={12} md={3}>
                <Seeds />
              </Col>
              <Col sm={12} md={3}>
                <Recommendations />
              </Col>
            </Row>
          </Grid>
        </Authenticate>
      </Col>
    </Row>
  </Grid>
)
