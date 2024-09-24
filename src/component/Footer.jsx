import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='container-f'>
      <p>@copyright</p>

      <NavLink to={'https://www.nettechassist.com'} className='nav-link' target='true'> NTA</NavLink>
    </div>

  )
}
