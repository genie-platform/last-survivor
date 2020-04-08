import React, { useEffect, useState } from 'react'
import {
  useHistory
} from 'react-router-dom'
// import './Sails.css'

export default function Rewards ({ userStates, profile, updateAccountAddress }) {
  const [accountAddress, setAccountAddress] = useState()
  const history = useHistory()
  useEffect(() => {
    if (profile && profile.accountAddress) {
      setAccountAddress(profile.accountAddress)
    }
  }, [profile])

  const handleAccountAddressChange = (event) => {
    setAccountAddress(event.target.value)
  }

  const userStatesWins = userStates.filter(userState => userState.isWinner)

  const handleAccountAddressUpdate = () => {
    updateAccountAddress(accountAddress)
  }

  const handleBack = () => history.goBack()

  return (
    <div>
      <div className='page-title'>Profile</div>
      <div>
        {
          userStatesWins.length > 0
            ? `Congratulations, you survived ${userStatesWins.length} sails`
            : 'Such a pitty, You didn\'t survived'
        }
      </div>
      {
        accountAddress
          ? 'Your account address is'
          : 'You don\'t have an account address yet, please set one'
      }
      <div><input type='string' value={accountAddress} onChange={handleAccountAddressChange} /></div>
      <button onClick={handleAccountAddressUpdate}>confirm</button>
      <div className='back' onClick={handleBack}>{'<-Back'}</div>
    </div>
  )
}
