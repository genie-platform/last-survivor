import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  Link
} from 'react-router-dom'
import './Guess.css'
import moment from 'moment'


const formatDate = (d) => moment(d).format('Do of MMMM, h [o\'clock] a')

export default function Guess ({ userState, loading, round, onIntroDone, handleMakeGuess }) {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (userState.guess) {
      setValue(userState.guess)
    }
  }, [userState.guess])

  const handleBack = () => onIntroDone(false, { persistent: false })

  return (
    <div className='guess'>
      <div className='page-title'>On the Board</div>
      <div className='text'>
        Dear Sir or Madame, <br />
          The crew and the Captain welcomes you on board
        <br />
        <br />
        <br />
        {`The ship is leaving the shore on ${formatDate(round.startingAt)} exactly. `}
        {`And reaches its destionation on ${formatDate(round.endingAt)}, approximately.`}
        <br />
        <div className={classNames({ hidden: loading })}>
          {
            userState.guess
              ? <>
                <span>{`You cabin is number ${userState.guess}`}</span>
                <br />
                <br />
                {round.isDone
                  ? <div>The ship arrived <br /></div>
                  : <div>{`Enjoy your sail, you'll arrive shore in ${moment(round.endingAt).diff(round.startingAt, 'hours')} hours`}</div>
                }
              </>
              : <>
                <span>Now, please choose your cabin bellow</span>
                <div className='center'><input type='number' value={value} onChange={handleChange} /></div>
              </>
          }
        </div>
      </div>
      <div onClick={handleBack} className='back'>{'<-Intro'}</div>
      {
        userState.guess
          ? round.isDone
            ? <Link to='/app/finish'>
              <div className='next'>{'Continue->'}</div>
            </Link>
            : <div className='next disabled'>{'Continue->'}</div>
          : <div onClick={() => handleMakeGuess(value)} className='next'>{'Confirm->'}</div>

      }
      <Link to='/profile'><div className='next-up'>{'My Profile->'}</div></Link>
    </div>
  )
}
