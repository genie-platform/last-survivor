import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import GuessPage from './Guess/Guess'
import FinishPage from './Finish/Finish'
import { fetchLastUserState, makeGuess, createUserState } from '../api/game'
import { useAsync } from 'react-use'
import isEmpty from 'lodash/isEmpty'

export default function App ({ user, currentRound, onStartOver, ...rest }) {
  const [userState, setUserState] = useState({})

  const handleMakeGuess = (guess) => {
    makeGuess(userState._id, guess)
    setUserState({ ...user, guess })
  }

  const startOver = async () => {
    await onStartOver()
    const userState = await createUserState()
    setUserState(userState)
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

  useEffect(() => {
    if (!state.loading && isEmpty(userState)) {
      startOver()
    }
  }, [state.loading, userState])

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

  const round = (userState && userState.round) ? userState.round : currentRound

  return (
    <div>
      <Switch>
        <Route path='/app/guess'>
          <GuessPage userState={userState} round={round} loading={state.loading} handleMakeGuess={handleMakeGuess} {...rest} />
        </Route>
        <Route path='/app/finish'>
          <FinishPage userState={userState} round={round} loading={state.loading} {...rest} startOver={startOver} />
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
