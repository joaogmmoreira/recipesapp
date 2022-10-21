import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
// import PropTypes from 'prop-types';
// import Header from '../Components/Header';

class DoneRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
    };
  }

  componentDidMount() {
    this.stateDoneRecipes();
  }

  filterAll = () => {
    this.stateDoneRecipes();
  };

  stateDoneRecipes = () => {
    const ae = localStorage.getItem('doneRecipes');
    const doneRecipes = JSON.parse(ae);
    this.setState = {
      doneRecipes,
    };
  }

  filterFoods = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    const recipesFoods = doneRecipes.filter((recipe) => recipe.type === 'foods');
    this.setState = {
      doneRecipes: recipesFoods,
    };
  };

  filterDrinks = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    const recipesDrinks = doneRecipes.filter((recipe) => recipe.type === 'drinks');
    this.setState = {
      doneRecipes: recipesDrinks,
    };
  };

  render() {
    const { doneRecipes } = this.state;
    // const { id } = JSON.parse(doneRecipes);

    return (
      <>
        <Header renderOnScreen={ false } title="Done Recipes" history={ {} } url="" />
        <div>
          <button
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
          </button>
          {
            doneRecipes.map((recipe, index) => {
              const { id, type, nationality, category,
                alcoholicOrNot, name, image, tags, doneDate } = recipe;
              return (
                <div key={ id }>
                  <Link to={ `/${type}/${id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                    <img
                      src={ image }
                      alt={ name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  {
                    type === 'foods' ? (
                      <div>
                        <p data-testid={ `${index}-horizontal-top-text` }>{ category }</p>
                        <p>{ nationality }</p>
                        <p
                          data-testid={ `${index}-${tags[0]}-horizontal-tag` }
                        >
                          { tags }
                        </p>
                      </div>
                    ) : <p>{ alcoholicOrNot }</p>
                  }
                  <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
                  <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                    Compartilhar
                  </button>
                </div>
              );
            })
          }
        </div>
      </>
    );
  }
}

// DoneRecipes.propTypes = {
//   history: PropTypes.objectOf(PropTypes.any).isRequired,
// };

export default connect(null, null)(DoneRecipes);
