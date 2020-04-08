import React, { useEffect, useState } from 'react'
import {
  useHistory
} from 'react-router-dom'
import './Sails.css'

export default function Rewards ({ userStates, profile, updateAccountAddress }) {
  const [accountAddress, setAccountAddress] = useState()
  const history = useHistory()
  useEffect(() => {
    if (profile && profile.accountAddress) {
      setAccountAddress(profile.accountAddress)
    }
  }, [profile])

  const handleBack = () => history.goBack()

  return (
    <div>
      <div className='page-title'>My Sails</div>
      <br />
      <div>
        {userStates.map(userState =>
          <div key={userState._id}>
            Your Guess was {userState.guess}
            {userState.isWinner ? ' You won!' : `Corect guess was ${userState.round.guess}`}
            {/* your reward: {reward.reward}$ */}
          </div>
        )}
      </div>
      <div className='back' onClick={handleBack}>{'<-Back'}</div>
    </div>
  )
}