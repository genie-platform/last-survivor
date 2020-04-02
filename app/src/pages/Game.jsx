import React, { useState, useEffect } from 'react'
import { makeGuess } from '../api/game'
import classNames from 'classnames'
import './Game.css'

export default function Game ({ guess, loading }) {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleGuess = () => {
    makeGuess(value)
  }

  useEffect(() => {
    setValue(guess)
  }, [guess])

  return (
    <div>
      <h3>The Game</h3>
      <div className={classNames({ hidden: loading })}>
        {
          guess
            ? 'Your guess is'
            : 'Now, guess a number between one and one thousand, and pray to beat the ods!'
        }
        <div><input type='number' value={value} onChange={handleChange} /></div>
        <button onClick={handleGuess}>{guess ? 'Change your mind' : 'Make a guess'}</button>
        <div>
          Or read the rules again
        </div>
      </div>
    </div>
  )
}
