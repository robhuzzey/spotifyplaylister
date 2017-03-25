import React from 'react'
export default (props) => (
  <div>
    <div>
      <img src={(props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />
      {props.track.name}
      {!props.isASeed && props.addSeed && <button onClick={props.addSeed}>Add Seed</button>}
      {props.isASeed && props.removeSeed && <button onClick={props.removeSeed}>Remove Seed</button>}
    </div>
    {/*<pre>{JSON.stringify(props.track, null, 2)}</pre>*/}
  </div>
)
