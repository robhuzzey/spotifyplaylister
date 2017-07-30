import React from 'react'
import Waypoint from 'react-waypoint'

export default (props) => (
  <div>
    {React.Children.map(props.children, (child, i) => {
      return (
        <div key={i}>
          {child}
          {(i === props.children.length - props.offset) && (
            <Waypoint onEnter={props.onEnter} />
          )}
        </div>
      )
    })}
  </div>
)
