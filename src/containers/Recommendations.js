import React from 'react'
import { connect } from 'react-redux'

import Track from '../components/Track.jsx'
import Page from '../components/Page.jsx'

import PlayControls from '../containers/PlayControls'
import TrackDetails from '../components/TrackDetails.jsx'

import { Badge, Button, ButtonGroup, Panel, Glyphicon } from 'react-bootstrap'
import GlyphText from '../components/GlyphText.jsx'

import { getRecommendations } from '../actions/recommendations'
import { set as setModal } from '../actions/modal'

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recommendations.items,
    isLoading: state.recommendations.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: (url, name) => {
      dispatch(loadTrack(url, name))
    },
    getRecommendations: () => {
      dispatch(getRecommendations())
    },
    setModal: (title, body) => {
      dispatch(setModal(title, body))
    }
  }
}

const loadingMessage = <span>Loading...<Glyphicon className="spinning" glyph="refresh" /></span>

const Recommendations = props => {

  return (
    <div>
      {props.items.length > 0 && <p><Button active={props.isLoading} onClick={props.getRecommendations}>{props.isLoading ? loadingMessage : 'Refresh suggestions'}</Button></p>}
      <div>
        {props.items.length === 0 && 
          <Panel>
            {props.isLoading ? loadingMessage : 'Once you have added liked tracks, a list of recommendations based off that will appear here.'}
          </Panel>
        }

        {props.items.map((track, i) => {
          return (
            <Track track={track} key={i}>
              <div className="controls">
                <PlayControls track={track} />
                <GlyphText glyph="info-sign" text="Track Info" onClick={() => props.setModal(track.title, <TrackDetails track={track} />)} />
              </div>
            </Track>
          )
        })}
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
