import React from 'react'
export default (props) => (
  <div>
    <div>
      <img src={(props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />
      {props.track.name}
      {props.seed && <button onClick={props.seed}>Seed</button>}
    </div>
    {/*<pre>{JSON.stringify(props.track, null, 2)}</pre>*/}
  </div>
)
