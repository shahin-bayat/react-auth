import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import Spinner from '../layout/Spinner'

const Login = props => {
  const authContext = useContext(AuthContext)
  const { login, loading, loadUser, error, isAuthenticated } = authContext
  useEffect(() => {
    loadUser()
    if (isAuthenticated) {
      props.history.push('/')
    }
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    username: 'applicant1',
    password: 'm4rFTZ9bnGxPFJDj',
  })
  const { username, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    if (username === '' || password === '') {
      alert('Please Enter Username and Password')
    } else {
      login({ username, password })
    }
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='form-container'>
          <h1>Account</h1>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                value={username}
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='text'
                name='password'
                value={password}
                onChange={onChange}
                required
              />
            </div>

            <input
              type='submit'
              value='Login'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
      )}
    </>
  )
}

export default Login
