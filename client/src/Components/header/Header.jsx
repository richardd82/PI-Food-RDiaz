import React from 'react'
import './header.css'
import SearchBar from '../searchBar/SearchBar'

const Header = () => {
  return (
    <nav className='navbar'>
     <label className="navTitle">Recipes</label> 
      <div className='searchbarContainer'><SearchBar /></div>      
    </nav>
    
  )
  
    
    
  
  
}

export default Header