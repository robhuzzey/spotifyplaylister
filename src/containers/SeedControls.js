import React from 'react'
import { connect } from 'react-redux'

import { addSeed, removeSeed } from '../actions/seed'

import { Button, Glyphicon } from 'react-bootstrap'


const mapStateToProps = (state, ownProps) => {
  return {
    isASeed: !!state.seeds.items.filter(seed => seed.id === ownProps.track.id).length
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSeed: track => {
      dispatch(addSeed(track))
    },
    removeSeed: track => {
      dispatch(removeSeed(track))
    }
  }
}

const SeedControls = props => {
  return (
    <span>
      {props.isASeed ? (
        <Button bsStyle="default" onClick={() => props.removeSeed(props.track)}><Glyphicon glyph="trash" /></Button>
      ) : (
        <Button bsStyle="default" onClick={() => props.addSeed(props.track)}><Glyphicon glyph="thumbs-up" /></Button>
      )}
    </span>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedControls)
