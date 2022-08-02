import React from 'react';
import './landing.css'
import introRecipes from '../../assets/introRecipes.mp4'


const Landing = () => {
  return (
    <div>
        <video loop autoPlay muted playsinline>
            <source src={introRecipes} type="video/mp4" />
        </video>
        <div className='landingText'>
            <p>Look at our recipes and prepare what you like the most.</p>
        </div>
        <div className='btnContainer'>
            <a href="/recipes" className='btn'>Eat & Stay Healthly</a>
        </div>
    </div>
  )
}

export default Landing