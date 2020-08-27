// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'
// import avatar from '../../../public/images/blank-avatar.png' 
import { Input } from '../../ui/input/Input'
import UploadImage from '../user/UploadImage'


// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => {
  // const [profileImage, setProfileImage] = useState("")
  // const [user, setUser] = useState({})

  // useEffect(() => {
  //   setUser({
  //     name: props.user.details.name,
  //     email: props.user.details.name,
  //     address: "",
  //     bio: "",
  //     image: profileImage,
  //   })
  // }, [user])
 // ^^ does this need a subscriptions array?
 // ^^ does this need a purchases array? 

 return (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>
    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      {/* <GridCell style={{ padding: '2em', alignBottom: 'align-bottom' }} > */}
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <section style={{
          width: '29.5vw',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1em',
          justifyContent: 'center',
          border: '1px solid black',
          flexDirection: 'column'
        }}>
          <img src={'https://images.unsplash.com/photo-1598264294394-ba29cf557627?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'} alt="dude-image" width="300" />
          {/* conditionally render the input on button click, create property to trigger display */}
          <input type="text" placeholder="Image URL here..." style={{ width: '85%', height: '10%', marginTop: '1em'}}></input>
          <button style={{ marginTop: '1em' }}>Update Image</button>
        </section>
        <section className="user-profile-details" 
          style={{
            width: '33vw',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid blue',
            justifyContent: 'center',
        }}>
          {/* conditionally render H3 depending on array of subscriptions not being empty */}
          <section className="date-container" style={{ textAlign: 'center', height: '50%' }}>
            <H3 style={{ marginBottom: '0.5em', paddingTop: '1em' }}>Upcoming Delivery:</H3>
            <H3 style={{ marginBottom: '0.5em' }}>Date Here</H3>
          </section>
          <section className="user-details-box" style={{ height: '50%' }}>
            <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
            <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
            <button>Update Email</button>
          </section>
        </section>
        <section 
          className="user-description-box"
          style={{
            border: '1px solid red',
            width: '34vw',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '1em',
        }}>
          <section className="button-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to={userRoutes.subscriptions.path}>
              <Button theme="primary">Subscriptions</Button>
            </Link>
            <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>

          </section>
          {/* placeholder for textarea is not working, why? */}
          <textarea style={{ width: '30vw', height: '40vh',resize: 'none', marginTop: '2em', placeholder: 'About me...' }}>About me...</textarea>
          <button style={{ marginTop: '1em'}}>Update Bio</button>
          {/* conditionally render bio button  */}
          {/* <button>Add Bio</button> */}
        </section>
      </section>
      <section className="user-orders" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', flexDirection: 'column' }}>
        <p style={{width: '20vw', paddingLeft: '1em', textDecoration: 'underline', fontSize: '3vh', paddingTop: '1em'}}>Returns and Orders</p>
        {/* conditionally render if there are orders array is empty */}
        <table style={{ marginTop: '1em', width: '85vw' }}>
          <tr style={{ fontStyle: 'italic' }}>
            <th>Date</th>
            <th>Item</th>
            <th>Status</th>
          </tr>
          <tr>
            <th>Some date</th>
            <th>One of stuff</th>
            <th>TBD</th>
          </tr>
          <tr>
            <th>Other date</th>
            <th>One of other stuff</th>
            <th>TBD</th>
          </tr>
          <tr>
            <th>Yet another date</th>
            <th>So much stuff</th>
            <th>TBD</th>
          </tr>
          <tr>
            <th>I eat dates</th>
            <th>Stuffing myself</th>
            <th>TBD</th>
          </tr>

        </table>
      </section>
      {/* </GridCell> */}
    </Grid>
  </div>
)}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
