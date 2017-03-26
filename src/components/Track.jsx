import React from 'react'
export default (props) => (
  <div>
    <div>
      {props.track &&
        <div>
          {props.track.album && <img src={(props.track.album.images[2] || props.track.album.images[1] || props.track.album.images[0]).url} />}
          {props.track.name}
          {props.play && <button onClick={() => props.play(props.track)}>Play</button>}
          {props.addSeed && !props.removeSeed && <button onClick={props.addSeed}>Add Seed</button>}
          {props.removeSeed && <button onClick={props.removeSeed}>Remove Seed</button>}
        </div>
      }
    </div>
    {/*<pre>{JSON.stringify(props.track, null, 2)}</pre>*/}
  </div>
)
