import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../api/auth'
import './Login.css'

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
    <div className='login'>
      <div className='page-title'>
        A riddle about numbers,<br /> psychology and vampires.
      </div>
      <div className='google'>
        <GoogleLogin
          clientId={clientId}
          onSuccess={handleLogin}
          buttonText='Login'
          cookiePolicy='single_host_origin'
        />
      </div>
      <div>
        Be the last survivor and win a reward in DAI
      </div>
    </div>
  )
}
