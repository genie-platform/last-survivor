import React from 'react'
import {
  Link
} from 'react-router-dom'

function Start ({ onIntroDone }) {
  const handleBack = () => onIntroDone(false, { persistent: false })

  return (
    <div>
      <div className='page-title'>On Boarding</div>
      <div style={{textAlign: 'left'}}>
        Dear Sir or Madame, <br />
        The crew and the captain welcomes you on board
        <br />
        <br />
        Your sails starts on April, 7 and arrives on April, 8
        <br />
        Now please choose your cabin bellow
      </div>
      <div onClick={handleBack} className='back'>{'<-Intro'}</div>
      <Link to='/app/guess'><div className='next'>{'Confirm->'}</div></Link>
    </div>
  )
}

export default Start
