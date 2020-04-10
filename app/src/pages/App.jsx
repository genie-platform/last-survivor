import React, { useState } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import GuessPage from './Guess/Guess'
import StartPage from './Start/Start'
import { fetchUserState, makeGuess } from '../api/game'
import { useAsync } from 'react-use'

export default function App ({ user, ...rest }) {
  const [userState, setUserState] = useState({})

  const handleMakeGuess = (guess) => {
    debugger
    makeGuess(guess)
    setUserState({ ...user, guess })
  }

  const state = useAsync(async () => {
    if (user.isAuthenticated) {
      const { data } = await fetchUserState()
      if (data) {
        setUserState(data)
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
      <Switch>
        <Route path='/app/start'>
          <StartPage />
        </Route>
        <Route path='/app/guess'>
          <GuessPage userState={userState} loading={state.loading} handleMakeGuess={handleMakeGuess} {...rest} />
        </Route>
      </Switch>
    </div>
  )
}
