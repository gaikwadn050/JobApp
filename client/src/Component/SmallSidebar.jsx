import React from 'react'
import { NavLink } from 'react-router-dom';
import Wrapper from "../assets/wrappers/SmallSidebar"
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa'
import Logo from './Logo'
import links from '../utils/links'
const SmallSidebar = () => {
  const {  user, showSidebar,
    isDarkTheme, toggleDarkTheme,
    toggleSidebar, logoutUser } = useDashboardContext()

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type='button' className="close-btn" onClick={toggleSidebar}><FaTimes /></button>
          <header>
            <Logo /> </header>
          <div className="div nv-links">
          </div>
          {links.map((link) => {
            const { text, path, icon } = link
            return <NavLink to={path} key={text} className='nav-link' onClick={toggleSidebar}>
              <span className='icon'> {icon}</span>
              {text}
            </NavLink>
          })
          }</div></div>
    </Wrapper>
  )
}

export default SmallSidebar;
