import React from 'react'
import './Layout.css'

function Layout ({ children }) {
  return (
    <>
      <div className='layout center'>
        <h3 className='title'>Last Survivor</h3>
        {children}
        <div className='bottom'>
        Powered by <a href='https://github.com/leonprou/genie' target='_blank' rel='noopener noreferrer'>Genie</a>
        </div>
        <h3 className='footer'>On a Boat</h3>
      </div>
    </>
  )
}

export default Layout
