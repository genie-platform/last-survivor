import React, { useState, useEffect } from 'react'
import {
  useHistory,
  Link
} from 'react-router-dom'
import IntroPage from './Intro'
import GamePage from './Game'
import { fetchCurrentRound } from '../api/game'
import { useAsync } from 'react-use'

export default function App ({ user, onIntroDone, rewards }) {
  const history = useHistory()
  const [guess, setGuess] = useState(0)

  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push('/login')
    }
  }, [user.isAuthenticated])

  const state = useAsync(async () => {
    if (user.isAuthenticated) {
      const { data } = await fetchCurrentRound()
      if (data) {
        setGuess(data.guess)
      }
      return data
    }
  }, [user.isAuthenticated])

  return (
    <div>
      <h3>Welcome to the last survivor</h3>
      {
        !user.isIntroDone
          ? <IntroPage onIntroDone={onIntroDone} />
          : <GamePage guess={guess} loading={state.loading} />
      }
      {
        rewards.length > 0 && <Link to='/rewards'>Your rewards</Link>
      }
    </div>
  )
  // }
}
