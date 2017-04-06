import React from 'react'
import { connect } from 'react-redux'

import { removeSeed } from '../actions/seed'
import { loadTrack } from '../actions/player'

import { Button } from 'react-bootstrap';

import Tracks from '../components/Tracks.jsx'
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
    <Tracks>
      <div>
        {props.items.length === 0 ?
          (
            <div>
              Tracks you have liked will appear here for review before you move on to get suggestions based off them.
            </div>
          ) : (
            <div>
              {props.items.map((track, i) => {
                return (
                  <Track track={track} key={i}>
                    <PlayControls track={track} />
                    <SeedControls track={track} />
                    <PlaylistControls track={track} />
                  </Track>
                )
              })}
            </div>
          )
        }
        
      </div>
    </Tracks>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seeds)
