import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'

import { authenticate } from '../actions'

export default (props) => (
  <div>
    <h1>Spotify Playlister</h1>
    <button onClick={authenticate}>Authenticate</button>
    <p>Application begins here</p>
    <Recommendations />
    <Seeds />
    <UserTracks />
  </div>
)
