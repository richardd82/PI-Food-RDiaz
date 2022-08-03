import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Landing from './Components/landing/Landing.jsx';
import Home from './Components/Home';
//import { RecipesCard } from './Components/container/recipesCard/RecipesCard';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route 
          exact
          path = '/'
          component = {Landing}
        />
        <Route 
          exact
          path = '/recipes'
          component = {Home}
        />
        {/* <Route 
          exact
          path = '/recipes/:id'
          component = {RecipesCard}
        /> */}
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
