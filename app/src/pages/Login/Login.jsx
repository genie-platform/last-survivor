import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { login } from '../../api/auth'
import './Login.css'

export default function LoginPage ({ onLoginSuccess, currentRound }) {
  const { clientId } = window.CONFIG.api.auth.google

  const history = useHistory()

  const handleLogin = ({ tokenId }) => {
    login(tokenId).then(({ token }) => {
      onLoginSuccess(token)
      history.push('/app')
    })
  }

  return (
    <div className='login'>
      <div className='page-title'>
        A riddle of numbers,<br /> psychology and vampires.
      </div>
      <div className='google'>
        <GoogleLogin
          clientId={clientId}
          onSuccess={handleLogin}
          buttonText='Login'
          cookiePolicy='single_host_origin'
        />
      </div>
      <div className='text'>
        Become the last one to survive and win
        <br />
        <div className='blink'>{currentRound && currentRound.reward && `${Math.round(currentRound.reward * 100) / 100} DAI`}</div>
      </div>
    </div>
  )
}
