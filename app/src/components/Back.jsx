
import React from 'react'
import {
  useHistory
} from 'react-router-dom'

export default function Back () {
  const history = useHistory()
  const handleBack = () => history.goBack()

  return <div className='back' onClick={handleBack}>{'<-Back'}</div>
}
