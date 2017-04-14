import React from 'react'
import Track from './Track.jsx'
import PlayControls from '../containers/PlayControls'
import PlaylistControls from '../containers/PlaylistControls'
import SeedControls from '../containers/SeedControls'
export default (props) => (
  <div>
    <Track track={props.track} />
    <PlayControls track={props.track} />
    <h2>Seed? <SeedControls track={props.track} /></h2>
    <h2>Add to your songs? <PlaylistControls track={props.track} /></h2>
  </div>
)
