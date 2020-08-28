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
import { Input } from '../../ui/input'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component
const Profile = (props) => {
  const [ img, setImg ] = useState('')
  const [ newImg, setNewImg ] = useState('')
  const [ isEditingImg, setIsEditingImg ] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ isEditingEmail, setIsEditingEmail ] = useState(false)
  const [ address, setAddress ] = useState('')
  const [ isEditingAddress, setIsEditingAddress ] = useState(false)
  const [ bio, setBio ] = useState('')
  const [ isEditingBio, setIsEditingBio ] = useState(false)

  const selectNewImage = (e) => {
    setNewImg(e.target.value)
  }

  const updateImage = () => {
    setIsEditingImg(!isEditingImg)
    setImg(newImg)
    setNewImg('')
  }
  
  const selectNewEmail = (e) => {
    setEmail('')
    setEmail(e.target.value)
  }

  const selectNewAddress = (e) => {
    setAddress(e.target.value)
  }

  const updateBio = (e) => {
    setBio(e.target.value)
  }
  
  // not working as expected
  // useEffect(() => {
  //   setEmail(props.user.details.email)
  // }, [ ])

 return (
  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>
    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ textAlign: 'center', padding: '.5em' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
      <section style={{ display: 'flex', justifyContent: 'center', borderBottom: '5px solid #f0f0f0', paddingBottom: '2em' }}>
        <section style={{
          width: '29.5vw',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '1em',
          justifyContent: 'center',
          // borderRight: '3px solid grey',
          flexDirection: 'column'
        }}>
          <img src={!img ? "https://history.ucr.edu/sites/g/files/rcwecm1916/files/styles/form_preview/public/blank-profile-picture-png.png?itok=MQ-iPuNG" : img} alt="profile-image" width="300" />
          { isEditingImg && <Input type="text" onChange={(e) => selectNewImage(e)} placeholder="Image URL here..." style={{ width: '85%', height: '10%', marginTop: '1em'}}></Input> }
          <Button theme="primary" onClick={() => updateImage()} style={{ marginTop: '1em' }}>{ isEditingImg ? 'Update Image' : 'Edit' }</Button>
        </section>
        <section className="user-profile-details" 
          style={{
            width: '33vw',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            // border: '1px solid blue',
            justifyContent: 'center',
        }}>
          {/* conditionally render H3 depending on array of subscriptions being empty or not */}

          <section className="date-container" style={{ textAlign: 'center', height: '42%' }}>
            <H3 style={{ marginBottom: '0.5em', paddingTop: '1em' }}>Upcoming Delivery:</H3>
            <H3 style={{ marginBottom: '0.5em' }}>2020/10/10</H3>
          </section>
          <section className="user-details-box" style={{ textAlign: 'center', height: '50%' }}>
            <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
            { isEditingEmail ? <Input type="text" onChange={(e) => selectNewEmail(e)} placeholder="New email here..." style={{ width: '85%', height: '10%' }}></Input> : <p style={{ color: grey2, marginBottom: '.5em' }}>{!email ? props.user.details.email : email}</p> }
            <Button theme="primary" onClick={() => setIsEditingEmail(!isEditingEmail)} style={{ marginBottom: '1em', marginTop: '.5em' }}>{ isEditingEmail ? 'Update Email' : 'Edit'}</Button>
            { isEditingAddress ? <Input type="text" onChange={(e) => selectNewAddress(e)} placeholder="New address here..." style={{ width: '85%', height: '10%', marginTop: '.5em' }}></Input> : <p style={{ color: grey2, marginTop: '.5em', marginBottom: '.5em' }}>{ !address ? 'Please update address' : address }</p> }
            <Button theme="primary" onClick={() => setIsEditingAddress(!isEditingAddress)} style={{ marginTop: '1em' }}>{ isEditingAddress ? 'Update Address' : 'Edit'}</Button>
          </section>
        </section>
        <section 
          className="user-description-box"
          style={{
            // borderLeft: '2px solid grey',
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
          { isEditingBio ? <textarea onChange={(e) => updateBio(e)} style={{ width: '30vw', height: '32vh', resize: 'none', marginTop: '2em', placeholder: 'About me...' }}>{bio}</textarea> : <p style={{ width: '30vw', height: '32vh', marginTop: '2em', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '1vh', padding: '1vh' }}>{ !bio ? "Add Personal Description" : bio }</p>}
          <Button theme="primary" onClick={() => setIsEditingBio(!isEditingBio)} style={{ marginTop: '.5em' }}>{ isEditingBio ? 'Update Bio': 'Edit'}</Button>
        </section>
      </section>
      <section className="user-orders" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', flexDirection: 'column' }}>
        <p style={{width: '20vw', paddingLeft: '1em', textDecoration: 'underline', fontSize: '3vh', paddingTop: '1em'}}>Returns and Orders</p>
        {/* conditionally render if there are orders array is empty */}
        <table style={{ marginTop: '1em', width: '85vw' }}>
          <tbody>
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
          </tbody>
        </table>
      </section>
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
