import React from 'react'
import { Media } from 'react-bootstrap'
export default (props) => (
  <Media style={{marginTop: '10px', marginBottom: '10px', borderBottom: '1px solid #EEE', paddingBottom: '10px'}}>
    <Media.Left style={{verticalAlign: 'middle'}}>
      <img alt="album art" width={90} height={90} src={props.track && props.track.album && (props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />
    </Media.Left>
    <Media.Body style={{verticalAlign: 'middle'}}>
      <Media.Heading>{props.track.name}<br /><small>{(props.track.artists || []).map(artist => artist.name).join(' / ')}</small></Media.Heading>
      {props.children}
    </Media.Body>
  </Media>
)
