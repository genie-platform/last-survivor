import React, { useEffect, useState } from 'react'
import Back from '../../components/Back'
import Sails from '../../components/Sails/Sails'

export default function Rewards ({ userStates, profile, updateAccountAddress }) {
  const [accountAddress, setAccountAddress] = useState()
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

  return (
    <div>
      <div className='page-title'>Profile</div>
      <div>
        {
          userStatesWins.length > 0
            ? `Congratulations, you survived ${userStatesWins.length} sails`
            : null
        }
      </div>
      {
        accountAddress
          ? 'Your account address is'
          : 'You don\'t have an account address yet, please set one'
      }
      <div><input type='string' value={accountAddress} onChange={handleAccountAddressChange} /></div>
      <button onClick={handleAccountAddressUpdate}>confirm</button>
      <Sails userStates={userStates} />
      <Back />
    </div>
  )
}
