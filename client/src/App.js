import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './App.css';
import Landing from './Components/landing/Landing.jsx';
import Home from './Components/Home';
import RecipesDetails from '../src/Components/container/recipesDetails/RecipesDetails';
import CreateRecipes from './Components/container/createRecipes/CreateRecipes';
//import { RecipesCard } from './Components/container/recipesCard/RecipesCard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
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
        <Route 
          exact
          path = '/recipes/:id'
          component = {RecipesDetails}
        />   
        <Route 
          exact
          path = '/create'
          component = {CreateRecipes}
        />   
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
