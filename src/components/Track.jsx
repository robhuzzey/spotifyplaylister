import React from 'react'
import { Media } from 'react-bootstrap'
export default (props) => (
  <Media>
    <Media.Left 
      onTouchStart={() => props.over(props.track)}
      onMouseOver={() => props.over(props.track)}
      onTouchEnd={props.out}
      onMouseOut={props.out}
    >
      <img alt="album art" width={64} height={64} src={props.track && props.track.album && (props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />
    </Media.Left>
    <Media.Body>
      <Media.Heading>{props.track.name} <small>{(props.track.artists || []).map(artist => artist.name).join(' / ')}</small></Media.Heading>
      {props.children}
    </Media.Body>
  </Media>
)
