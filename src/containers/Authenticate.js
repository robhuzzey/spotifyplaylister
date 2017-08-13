import React from 'react'
import { connect } from 'react-redux'
import { checkAccessToken, authenticate, getMe } from '../actions/authenticate'

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated,
    accessToken: state.authenticate.accessToken
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: () => {
      dispatch(authenticate())
    },
    checkAccessToken: () => {
      dispatch(checkAccessToken())
    },
    getLoggedInUserDetails: () => {
      dispatch(getMe())
    }
  }
}

class Authenticate extends React.Component {
  constructor(props) {
    super(props)
    props.checkAccessToken()
  }

  componentDidUpdate() {
    this.props.checkAccessToken()
    if(!this.props.isAuthenticated) {
      this.props.authenticate()
    } else {
      this.props.getLoggedInUserDetails()
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          this.props.children
        :
          (
            <p>This application requires authentication. Redirecting you now.</p>
          )
        }
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authenticate)
