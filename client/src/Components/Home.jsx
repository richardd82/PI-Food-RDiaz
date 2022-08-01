import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header/Header';
import Container from './container/Container';
import Footer from './footer/Footer';


ReactDOM.render(
    <React.StrictMode>
      <Header />
      <Container />
      <Footer />
    </React.StrictMode>,
    document.getElementById('root')
  );
  