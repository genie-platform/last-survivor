import React, { useState, useEffect } from 'react'
import { makeGuess } from '../../api/game'
import classNames from 'classnames'
import './Game.css'

export default function Game ({ userState, loading }) {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleGuess = () => {
    makeGuess(value)
  }

  useEffect(() => {
    if (userState.guess) {
      setValue(userState.guess)
    }
  }, [userState.guess])

  return (
    <div className='guess'>
      <div className='title'>The Guess</div>
      <div className={classNames({ hidden: loading })}>
        {
          userState.guess
            ? `So you think that the cabin number ${userState.guess} will survive `
            : 'Now, This is the time to choose!'
        }
        <div><input type='number' value={value} onChange={handleChange} /></div>
        <button onClick={handleGuess}>{userState.guess ? 'Want to change?' : 'Make a guess'}</button>
      </div>
      <div className='back'>{'<-Back'}</div>
      <div className='next'>{'Results->'}</div>
    </div>
  )
}
