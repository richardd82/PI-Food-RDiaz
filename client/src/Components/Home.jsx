import React from 'react';
import Header from './header/Header';
import { Route } from 'react-router-dom';
import Container from './container/Container';
import Footer from './footer/Footer';

const Home = () => {
  return (
   <>    
      <Header/>    
      <Route 
          exact
          path = '/recipes'
          component = {Container}
        />      
      <Footer />
    </>
  )
}
  export default Home;