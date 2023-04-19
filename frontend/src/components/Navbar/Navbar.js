import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>

    <div className='navbar' >
      
      <Link to="/Register"> Register </Link>
      <Link to="/login"> login </Link>
      <Link to="/CreateOrder"> Order </Link>
      <Link to="/CreateCraft"> Craft </Link>
      <Link to="/Comment"> Comment </Link>
      <Link to="/Home"> Home </Link>
    </div>
    </div>
  )
}

export default Navbar