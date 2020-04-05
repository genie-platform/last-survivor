import React, { useState, useEffect } from 'react'
import { makeGuess } from '../../api/game'
import classNames from 'classnames'
import './Game.css'

export default function Game ({ round, loading }) {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleGuess = () => {
    makeGuess(value)
  }

  useEffect(() => {
    if (round.guess) {
      setValue(round.guess)
    }
  }, [round.guess])

  return (
    <div className='guess'>
      <div className='title'>The Guess</div>
      <div>
        Time to choose
      </div>
      <div className={classNames({ hidden: loading })}>
        {
          round.guess
            ? `So you think that the cabin number ${round.guess} will survive `
            : 'Now, This is the time to choose!'
        }
        <div><input type='number' value={value} onChange={handleChange} /></div>
        <button onClick={handleGuess}>{round.guess ? 'Want to change?' : 'Make a guess'}</button>
        {/* <div>
          Or read the rules again
        </div> */}
      </div>
    </div>
  )
}
