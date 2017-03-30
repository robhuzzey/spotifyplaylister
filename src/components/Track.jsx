import React from 'react'
export default (props) => (
  <div className="media">
    <div className="media-left">
      <img className="media-object" alt="album art" width={64} height={64} src={props.track && props.track.album && (props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />
    </div>
    <div className="media-body">
      <h4 className="media-heading">{props.track.name} <small>{(props.track.artists || []).map(artist => artist.name).join(' / ')}</small></h4>
      {props.children}
    </div>
  </div>
)
