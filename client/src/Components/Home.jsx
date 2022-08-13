import React from 'react';
import Header from './header/Header';
import { Route } from 'react-router-dom';
import Container from './container/Container';
import Footer from './footer/Footer';
import CreateRecipes from './container/createRecipes/CreateRecipes';

const Home = () => {
  return (
   <>    
      <Header/>    
      <Route 
          exact
          path = '/recipes'
          component = {Container}
        />      
      <Route 
          exact
          path = '/create'
          component = {CreateRecipes}
        />      
      <Footer />
    </>
  )
}
  export default Home;

