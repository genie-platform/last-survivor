import React, { useState } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import GuessPage from './Guess/Guess'
import FinishPage from './Finish/Finish'
import { fetchLastUserState, makeGuess } from '../api/game'
import { useAsync } from 'react-use'

export default function App({ user, currentRound, ...rest }) {
  const [userState, setUserState] = useState({})

  const handleMakeGuess = (guess) => {
    makeGuess(guess)
    setUserState({ ...user, guess })
  }

  const state = useAsync(async () => {
    if (user.isAuthenticated) {
      const { data } = await fetchLastUserState()
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

  if (state.loading || !currentRound) {
    return null
  }

  const round = userState ? userState.round : currentRound

  return (
    <div>
      <Switch>
        <Route path='/app/guess'>
          <GuessPage userState={userState} round={round} loading={state.loading} handleMakeGuess={handleMakeGuess} {...rest} />
        </Route>
        <Route path='/app/finish'>
          <FinishPage userState={userState} round={round} loading={state.loading} {...rest} />
        </Route>
        {/* <Route path='/app'>
          {
            round.isDone
              ? <Redirect
                to={{
                  pathname: '/app/finish'
                }}
              />
              : <Redirect to='/app/guess' />
          }
        </Route> */}
        <Redirect from='/app' to='/app/guess' />
      </Switch>
    </div>
  )
}
