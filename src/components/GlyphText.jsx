import React from 'react'
import { Glyphicon } from 'react-bootstrap'
export default (props) => (
  <span onClick={props.onClick} className="actionButton"><Glyphicon glyph={props.glyph} /><span>{props.text}</span></span>
)
