import React, { useState } from 'react'
import classNames from 'classnames'
import {
  Link
} from 'react-router-dom'

import Back from '../../components/Back'

function Finish ({ round, userState, startOver }) {
  const [isRevealed, setReveal] = useState(false)

  if (!round) {
    return null
  }
  return (
    <div>
      <div className='page-title'>The Arrival</div>
      <div className='left'>
        {!userState.isWinner
          ? (<div>
            Unfortunately, the medics on shore quickly discovered two red dots on your neck.
            <br />
            <br />
            You've been bitten and soon to become a vampire!
            May God bless your soul
            <br />
            <br />
            <br />
            <button onClick={() => setReveal(true)} className={classNames({ hidden: isRevealed })}>
                Reveal the survivor
            </button>
            <div className={classNames({ hidden: !isRevealed })}>
              {`And by the way, the survived cabin is ${round.guess}, not ${userState.guess}`}
            </div>
          </div>)
          : <div>
            Among all the pasenger's you've been the only one to pass the medic examination successfully.
            <br />
            <br />
            Congrats, you survived the sailing, <br />
            You are the last survivor :tada:
            <br />
            <br />
            Go to profile to claim your reward.
          </div>
        }
      </div>
      <Back />
      <Link to='/profile'><div className='next-up'>{'My Profile->'}</div></Link>
      <Link to='/app/guess'><div onClick={startOver} className='next'>{'Sail Again->'}</div></Link>
    </div>
  )
}

export default Finish
