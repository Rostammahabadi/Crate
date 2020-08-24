// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
// props incoming from store have the following form 
// user {
//   details: {
//     email: "user@crate.com",
//     name: "The User",
//     role: "USER"
//   },
//   error: "",
//   isAuthenticated: true,
//   isLoading: false  
// }
// props also receives a logout fn through props that is passed into the button

// INSIDE GRID / GRIDCELL 
// THIS CAN BE A FORM requires state
// need to create image input for uploading
// need to create text import for description
// need to create email edit fn
// need to create shipping address display + edit fn
// run SET_USER 

// need to display subscription history for client
// when client is subscribed to a crate - on load it adds them to 
// subscriptionsByUser.list in the store - - this is an arr with 
// list arr has an obj {
//      id,
//      user: {id, name, email},
//      crate: {id, name, description}, (does not specify items - can we cross reference with name?)
//      createdAt: int (this number is a Date.now() that can be user for calculating date of next create?)
// }

// need to display items kept from client subscription history
// need to display upcoming subscription shipping date 


// this component will need state - add Hooks for all inputs state (or translate to class)
// the inputs to change state for bio/img/address/email - with a FORM?
// state is required because redux cannot update state with Actions???

// use input html tag type FILE that does the uploading of files from local
// need to figure out how to post an image!

const Profile = (props) => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        {/* ADD IMG AND BUTTON FOR LAYOUT TEST PURPOSES */}
        <p style={{ color: grey2, marginBottom: '2em' }}>User Address Here</p>
        <section>
          <p>Profile Image Section</p>
          <img src="https://images.unsplash.com/photo-1593440497401-b87d3bb3fb8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=958&q=80"width={200} alt="test-image" />
          <Button theme="primary">Upload Image</Button>
        </section>
        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)
// ^^^ inside <Grid><GridCell> it seems to be able to place the children of gridcells all accordingly 

// Component Properties
// expand on this if we need to bring in more state from store 
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
// expand on this if we need to bring in more state from store 
// this gets passed down to connect
function profileState(state) {
  return {
    user: state.user
  }
}

// connect ties our component state to the redux store.
// profileState is the mapStateToProps - allows STORE access 
// destructured logout is the mapDispatchToProps - allows UPDATING the stor
// curried fn passes the result of the connect into the Profile component
export default connect(profileState, { logout })(Profile)
