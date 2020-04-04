import React, { useEffect, useState } from 'react'

export default function Rewards ({ rewards, profile, updateAccountAddress }) {
  const [accountAddress, setAccountAddress] = useState()

  useEffect(() => {
    if (profile && profile.accountAddress) {
      setAccountAddress(profile.accountAddress)
    }
  }, [profile])

  const handleAccountAddressChange = (event) => {
    setAccountAddress(event.target.value)
  }

  const handleAccountAddressUpdate = () => {
    updateAccountAddress(accountAddress)
  }

  return (
    <>
      <div>Rewards</div>
      <div>
        Congratulations, you won!
      </div>
      {
        accountAddress
          ? 'Your account address is'
          : 'You don\'t have an account address yet, please set one'
      }
      <div><input type='string' value={accountAddress} onChange={handleAccountAddressChange} /></div>
      <button onClick={handleAccountAddressUpdate}>confirm</button>
      <div>
        {rewards.map(reward =>
          <div key={reward._id}>
            your reward: {reward.reward}$
          </div>
        )}
      </div>
    </>
  )
}
