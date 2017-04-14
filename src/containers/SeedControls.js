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
  return props.isASeed ? (
    <Button bsStyle="primary" active onClick={() => props.removeSeed(props.track)}><Glyphicon glyph="minus" /></Button>
  ) : (
    <Button bsStyle="primary" onClick={() => props.addSeed(props.track)}><Glyphicon glyph="plus" /></Button>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedControls)
