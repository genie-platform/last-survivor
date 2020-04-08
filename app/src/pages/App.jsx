import React, { useState, useEffect } from 'react'
import {
  Redirect
} from 'react-router-dom'
import GuessPage from './Guess/Guess'
import { fetchCurrentState } from '../api/game'
import { useAsync } from 'react-use'

export default function App({ user, onIntroDone, currentRound }) {
  // const history = useHistory()
  const [currentState, setCurrentState] = useState({})

  // useEffect(() => {
  //   if (!user.isAuthenticated) {
  //     history.push('/login')
  //   }
  // }, [user.isAuthenticated])

  const state = useAsync(async () => {
    if (user.isAuthenticated) {
      const { data } = await fetchCurrentState()
      if (data) {
        setCurrentState(data)
      }
      return data
    }
  }, [user.isAuthenticated])

  if (!user.isAuthenticated) {
    return <Redirect
      to={{
        pathname: '/login'
      }}
    />
  }
  if (!user.isIntroDone) {
    return <Redirect
      to={{
        pathname: '/intro'
      }}
    />
  }

  return (
    <div>
      <GuessPage currentRound={currentRound} userState={currentState} loading={state.loading} />
    </div>
  )
}
