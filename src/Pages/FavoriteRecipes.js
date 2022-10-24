import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonShare2 from '../Components/ButtonShare2';
import Header from '../Components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteRecipes: [],
    };
  }

  componentDidMount() {
    this.stateRecipesFavorite();
  }

  filterAll = () => {
    this.stateRecipesFavorite();
  };

  stateRecipesFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      favoriteRecipes,
    });
  }

  // filterFoods = () => {
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const recipesFoods = favoriteRecipes.filter((recipe) => recipe.type === 'food');
  //   this.setState({
  //     favoriteRecipes: recipesFoods,
  //   });
  // };

  // filterDrinks = () => {
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const recipesDrinks = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
  //   this.setState({
  //     favoriteRecipes: recipesDrinks,
  //   });
  // };

  handleRemoveFavoriteRecipes = (recipe) => {
    const getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const getcorrect = getStorage
      .find((inObj) => inObj.id === recipe.id);
    const updatedFavRecipes = getStorage
      .filter((inObj) => inObj.id !== getcorrect.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavRecipes));
    this.stateRecipesFavorite();
  }

  render() {
    const { favoriteRecipes } = this.state;

    return (
      <>
        <Header renderOnScreen={ false } title="Favorite Recipes" history={ {} } url="" />
        <div>
          {/* <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ this.filterAll }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ this.filterFoods }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ this.filterDrinks }
          >
            Drinks
          </button> */}
          { !favoriteRecipes ? <p>Sem receitas favoritas...</p>
            : favoriteRecipes.map((recipe, index) => {
              const { id, type, nationality, category,
                alcoholicOrNot, name, image } = recipe;

              return (
                <div key={ id }>
                  <Link to={ `recipesapp/${type}s/${id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                    <img
                      src={ image }
                      alt={ name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  {
                    type === 'food' ? (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { `${nationality} - ${category}` }
                      </p>
                    ) : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { alcoholicOrNot }
                      </p>
                    )
                  }
                  <ButtonShare2 index={ index } type={ type } id={ id } />
                  <button
                    type="button"
                    onClick={ () => this.handleRemoveFavoriteRecipes(recipe) }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="whiteHeartIcon"
                      className="img-fav"
                    />
                  </button>
                </div>
              );
            }) }
        </div>
      </>
    );
  }
}

export default connect(null, null)(FavoriteRecipes);
