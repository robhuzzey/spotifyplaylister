import React from 'react'
import { connect } from 'react-redux'

import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'

import { Button, ButtonGroup, Panel } from 'react-bootstrap';

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import SeedControls from '../containers/SeedControls'
import PlaylistControls from '../containers/PlaylistControls'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.seeds.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    removeSeed: trackId => {
      dispatch(removeSeed(trackId))
    }
  }
}

const Seeds = props => (
  <div>
    {props.items.length === 0 ?
      (
        <Panel>
          Tracks you have liked will appear here for review before you move on to get suggestions based off them.
        </Panel>
      ) : (
        <div>
          {props.items.map((track, i) => {
            return (
              <Track track={track} key={i}>
                <ButtonGroup justified>
                <ButtonGroup>
                  <PlayControls track={track} />
                </ButtonGroup>
                <ButtonGroup>
                  <SeedControls track={track} />
                </ButtonGroup>
              </ButtonGroup>
              </Track>
            )
          })}
        </div>
      )
    }
    
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
