import React, { useState, useEffect } from 'react'
import {
  useHistory
} from 'react-router-dom'
import IntroPage from './Intro/Intro'
import GamePage from './Game/Game'
import { fetchCurrentState } from '../api/game'
import { useAsync } from 'react-use'

export default function App ({ user, onIntroDone, currentRound }) {
  const history = useHistory()
  // const [guess, setGuess] = useState(0)
  const [currentState, setCurrentState] = useState({})

  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push('/login')
    }
  }, [user.isAuthenticated])

  const state = useAsync(async () => {
    if (user.isAuthenticated) {
      const { data } = await fetchCurrentState()
      if (data) {
        setCurrentState(data)
      }
      return data
    }
  }, [user.isAuthenticated])

  return (
    <div>
      {/* <h3>Welcome to the last survivor</h3> */}
      {
        !user.isIntroDone
          ? <IntroPage onIntroDone={onIntroDone} />
          : <GamePage currentRound={currentRound} userState={currentState} loading={state.loading} />
      }
      {
        // rewards.length > 0 && <Link to='/rewards'>Your rewards</Link>
      }
    </div>
  )
  // }
}
