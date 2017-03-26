import React from 'react'
import Track from './Track.jsx'
import Controls from '../containers/Controls'
export default (props) => (
  <Track track={props.track}>
    <Controls track={props.track} />
  </Track>
)
