import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='container-f'>
      <p>® Shizuka Store {currentYear} </p>

      <NavLink to={'https://www.nettechassist.com'} className='nav-link' target='true'> NTA</NavLink>
    </div>

  )
}
