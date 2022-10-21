import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';
import Profile from './Pages/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';
import RecipeInProgress from './Pages/RecipeInProgress';

class App extends React.Component {
  componentDidMount() {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  render() {
    return (
      <Switch>
        <Route exact path="recipesapp/" component={ Login } />
        <Route exact path="recipesapp/foods" component={ Recipes } />
        <Route exact path="recipesapp/drinks" component={ Recipes } />
        <Route exact path="recipesapp/foods/:id" component={ RecipeDetails } />
        <Route exact path="recipesapp/drinks/:id" component={ RecipeDetails } />
        <Route exact path="recipesapp/profile" component={ Profile } />
        <Route
          exact
          path="recipesapp//foods/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="recipesapp/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact path="recipesapp/done-recipes" component={ DoneRecipes } />
        <Route exact path="recipesapp/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    );
  }
}

export default App;
