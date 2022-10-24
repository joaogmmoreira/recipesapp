import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Loading from '../Components/Loading';
import RecipeCheckbox from '../Components/RecipeCheckbox';
import ShareFavBtn from '../Components/ShareFavBtn';
import fetchDrinkObject from '../services/fetchDrinkAPI';
import fetchFoodsObject from '../services/fetchFoodAPIs';

class RecipeInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      isFood: true,
      infoObj: {},
      recipeName: '',
      recipeImage: '',
      recipeCategory: '',
      recipeInstructions: '',
      recipeIngredients: [],
      recipeMeasures: [],
      isLoading: true,
      checkboxesValidation: true,
    };
  }

  componentDidMount() {
    this.getRecipeById();
  }

  saveRecipeIngredientsAndMeasures = (obj) => {
    const array = Object.entries(obj[0]);

    const filteredArray = array.filter((element) => (element[0].includes('strIngredient')
    && element[1]) || (element[0].includes('strMeasure') && element[1]));

    filteredArray.map((element) => {
      if (element[0].includes('strIngredient')) {
        this.setState((prevState) => ({
          recipeIngredients: [...prevState.recipeIngredients, element[1]],
        }));
      }
      if (element[0].includes('strMeasure')) {
        this.setState((prevState) => ({
          recipeMeasures: [...prevState.recipeMeasures, element[1]],
        }));
      }
      return 'oi';
    });
  }

  getRecipeById = async () => {
    const { location: { pathname } } = this.props;

    const pathnameArray = pathname.split('/');
    const pathnameId = pathnameArray[3];

    if (pathname.includes('drinks')) {
      const recipeData = await fetchDrinkObject.fetchDrinksById(pathnameId);

      const data = recipeData.drinks[0];
      this.setState(() => ({
        isFood: false,
        infoObj: data,
        recipeName: data.strDrink,
        recipeImage: data.strDrinkThumb,
        recipeCategory: data.strCategory,
        recipeInstructions: data.strInstructions,
      }), () => {
        this.saveRecipeIngredientsAndMeasures(recipeData.drinks);
        this.validateCheckBoxes();
        this.setState({
          isLoading: false,
        });
      });
    }

    if (pathname.includes('foods')) {
      const recipeData = await fetchFoodsObject.fetchFoodsById(pathnameId);

      const data = recipeData.meals[0];
      this.setState(() => ({
        isFood: true,
        infoObj: data,
        recipeName: data.strMeal,
        recipeImage: data.strMealThumb,
        recipeCategory: data.strCategory,
        recipeInstructions: data.strInstructions,
      }), () => {
        this.saveRecipeIngredientsAndMeasures(recipeData.meals);
        this.validateCheckBoxes();
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  renderRecipeIngredients = () => {
    const { recipeIngredients, recipeMeasures } = this.state;
    const { location: { pathname } } = this.props;
    const pathnameArray = pathname.split('/');
    const pathnameId = pathnameArray[3];

    return recipeIngredients.map((element, index) => (
      <div key={ `${element}-${index}` } className="ingredients-recipe">
        <RecipeCheckbox
          element={ `${element} ${recipeMeasures[index]}` }
          index={ index }
          id={ pathnameId }
          pathname={ pathname }
          recipeMeasures={ recipeMeasures }
          validateCheckBoxes={ this.validateCheckBoxes }
        />
      </div>
    ));
  }

  validateCheckBoxes = () => {
    const allCheckBoxes = document.querySelectorAll('input[type=checkbox]');
    const markedCheckboxes = document.getElementsByClassName('checked');
    // console.log(allCheckBoxes);
    // console.log(markedCheckboxes);
    // console.log(this.state);
    if (markedCheckboxes.length === allCheckBoxes.length
      && markedCheckboxes.length && allCheckBoxes.length) {
      this.setState({
        checkboxesValidation: false,
      });
    } else {
      this.setState({
        checkboxesValidation: true,
      });
    }
  }

  registerDoneRecipes = () => {
    const { recipeImage, recipeName } = this.state;
    const { history } = this.props;
    const { location: { pathname } } = this.props;
    const pathnameArray = pathname.split('/');
    const pathnameId = pathnameArray[3];
    const changePath = history.push('/recipesapp/done-recipes');
    const storageFormat = {
      id: pathnameId,
      image: recipeImage,
      name: recipeName,
    };

    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      return localStorage
        .setItem('doneRecipes', JSON
          .stringify([storageFormat]));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(doneRecipes);
    const isThereRecipe = doneRecipes.some((recipe) => recipe.id === pathnameId);
    console.log(isThereRecipe);

    if (isThereRecipe) {
      return changePath;
    }

    if (!isThereRecipe) {
      const registerRecipe = [...doneRecipes, storageFormat];
      localStorage.setItem('doneRecipes', JSON.stringify(registerRecipe));
      return changePath;
    }
    return changePath;
  }

  render() {
    const {
      isFood,
      infoObj,
      recipeName,
      recipeImage,
      recipeCategory,
      recipeInstructions,
      isLoading,
      checkboxesValidation,
    } = this.state;

    const RecipeProgress = (
      <div>
        <img
          src={ recipeImage }
          alt={ recipeName }
          data-testid="recipe-photo"
          className="recipe-detail-img"
        />
        <div className="recipe-details-header">
          <h2 data-testid="recipe-title">{ recipeName }</h2>
          <div className="btn-share-fav">
            <ShareFavBtn infoObj={ infoObj } isFood={ isFood } />
          </div>
        </div>
        <div>
          <h3 data-testid="recipe-category">
            { recipeCategory }
          </h3>
        </div>
        <div className="instructions">
          <h2>Ingredients</h2>
          { this.renderRecipeIngredients() }
        </div>
        <div className="instructions">
          <h2>Instructions</h2>
          <p data-testid="instructions">{ recipeInstructions }</p>
        </div>
        <div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ checkboxesValidation }
            onClick={ () => {
              this.registerDoneRecipes();
            } }
            className="done-recipe"
          >
            Finalizar
          </button>
        </div>
      </div>
    );

    return (
      <div>
        {
          isLoading ? <Loading /> : RecipeProgress
        }
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    includes: PropTypes.func,
  }).isRequired,
};

export default connect(null, null)(RecipeInProgress);
