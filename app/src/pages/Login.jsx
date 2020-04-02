import React, { Component } from 'react'
import {
  useHistory,
  useLocation
} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../api/auth'

export default function LoginPage (props) {
  const { clientId } = window.CONFIG.api.auth.google

  const history = useHistory()

  const handleLogin = ({ tokenId }) => {
    login(tokenId).then(({ token }) => {
      props.onLoginSuccess(token)
      history.push('/')
    })
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={handleLogin}
      buttonText='Login'
      cookiePolicy='single_host_origin'
    />
  )
}
