import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
import {Nav} from '../../styles'

function Navbar(props) {
  const {logoutUser, user, isAuth} = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    if(isAuth)
    logoutUser();
  }

  const loggedIn = () => {
    const greeting = user ? `Hello, ${user.username}` : '';
    return (
      <Nav className="nav" >
        <h2 className="title nav__brand white-text">_S</h2>
        {isAuth && (<div className="user__greeting"> <h3 className="white-text">{greeting}</h3> </div>) }
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink className="nav__link white-text" to="/">Home</NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link white-text" to="/profile">Profile</NavLink>
          </li>
          <li className="nav__item">
            <a href="" className="white-text" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </Nav>
    )
  }

  const loggedOut = () => {
    return(
      <Nav className="nav" >
        <h2 className="title nav__brand white-text">_S</h2>
        <ul className="nav__menu p-2">
          <li className="nav__item">
            <NavLink className="nav__link white-text" to="/login">Login</NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link white-text" to="/register">Sign Up</NavLink>
          </li>
        </ul>
      </Nav>
    )
  }
  
  
  
  return (
    <header>
      {isAuth ? loggedIn(): loggedOut()}
    </header>
  )
}

export default Navbar