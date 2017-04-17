import React from 'react'
import { connect } from 'react-redux'
import { addSeed, removeSeed } from '../actions/seed'
import GlyphText from '../components/GlyphText.jsx'

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
    <GlyphText glyph="heart" onClick={() => props.removeSeed(props.track)} text="Remove" />
  ) : (
    <GlyphText glyph="heart-empty" onClick={() => props.addSeed(props.track)} text="Add" />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeedControls)
