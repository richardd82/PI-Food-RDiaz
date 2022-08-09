import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <nav className='navbar'>
    <Link to='/recipes'>
     <label className="navTitle">Recipes</label>       
     </Link>
    </nav>
    
  )
  
    
    
  
  
}

export default Header