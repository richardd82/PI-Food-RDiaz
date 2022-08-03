import React from 'react'
import './header.css'
import SearchBar from '../searchBar/SearchBar'

const Header = () => {
  return (
    <nav className='navbar'>
      Recipes
      <div className='searchbarContainer'><SearchBar /></div>      
    </nav>
    
  )
  
    
    
  
  
}

export default Header