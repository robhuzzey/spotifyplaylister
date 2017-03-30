import React from 'react'
import UserTracks from '../containers/UserTracks'
import Seeds from '../containers/Seeds'
import Recommendations from '../containers/Recommendations'
import Authenticate from '../containers/Authenticate'
import Player from '../containers/Player'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views'

import Drawer from 'material-ui/Drawer'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.state = {
      slideIndex: 0,
      open: false
    }
  }

  handleChange(slideIndex) {
    this.setState({
      slideIndex
    })
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Spotify Playlister" onLeftIconButtonTouchTap={this.toggleDrawer}>
            <Player />
          </AppBar>
          <Authenticate>
            <Tabs
              onChange={this.handleChange}
              value={this.state.slideIndex}>
              <Tab label="Tracks" value={0} />
              <Tab label="Suggestions" value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChange}>
              <div className="panel-body">
                <UserTracks />
              </div>
              <div className="panel-body">
                <Recommendations />
              </div>
            </SwipeableViews>
          </Authenticate>

          <Drawer open={this.state.open} docked={false} onRequestChange={() => this.setState({open: false})}>
            <Seeds />
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main
