import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'


export default (props) => (
  <div>
    <h1>Spotify Playlister</h1>
    <Authenticate>
      <Recommendations />
      <Seeds />
      <UserTracks />
    </Authenticate>
  </div>
)
