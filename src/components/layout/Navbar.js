import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Navbar = () => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, logout } = authContext

  const authenticatedLinks = (
    <Fragment>
      <li>
        <a onClick={() => logout()} href='#!'>
          <i className='fas fa-sign-out-alt'></i> Logout
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <nav className='navbar'>
      <h1>ISCOPE</h1>
      <ul>{isAuthenticated ? authenticatedLinks : guestLinks}</ul>
    </nav>
  )
}

export default Navbar
