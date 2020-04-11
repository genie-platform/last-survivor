import React from 'react'
import './Sails.css'

export default function Sails ({ userStates }) {

  return (
    <table>
      <thead>
        <tr>
          <th>Your Cabin</th>
          <th>Suviving Cabin</th>
        </tr>
      </thead>
      <tbody>
        {userStates.map(userState =>
          <tr key={userState._id}>
            <td>{userState.guess}</td>
            <td>{userState.round.guess}</td>
            {/* {userState.isWinner ? ' You won!' : `Corect guess was ${userState.round.guess}`} */}
            {/* your reward: {reward.reward}$ */}
          </tr>
        )}
      </tbody>
    </table>
  )
}
