import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonShare2 from '../Components/ButtonShare2';
import Header from '../Components/Header';

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

  // filterAll = () => {
  //   this.stateDoneRecipes();
  // };

  stateDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({
      doneRecipes,
    }, () => console.log(doneRecipes));
  }

  // filterRecipes = () => {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const recipesFoods = doneRecipes.filter((recipe) => recipe.type === 'food');
  //   this.setState({
  //     doneRecipes: recipesFoods,
  //   });
  // };

  // filterDrinks = () => {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   const recipesDrinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
  //   this.setState({
  //     doneRecipes: recipesDrinks,
  //   });
  // };

  render() {
    const { doneRecipes } = this.state;

    return (
      <>
        <Header renderOnScreen={ false } title="Done Recipes" history={ {} } url="" />
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
          > */}
          {/* Foods
        </button> */}
          {/* <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ this.filterDrinks }
          >
            Drinks
          </button> */}
          { !doneRecipes ? <p>Sem receitas feitas...</p>
            : doneRecipes.map((recipe, index) => {
              const { id, type, nationality, category,
                alcoholicOrNot, name, image, tags, doneDate } = recipe;

              return (
                <div key={ id }>
                  <Link to={ `/recipesapp/${type}s/${id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                    <img
                      src={ image }
                      alt={ name }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>
                  {
                    type === 'food' ? (
                      <div>
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { `${nationality} - ${category}` }
                        </p>
                        {
                          tags.map((tag) => (
                            <p
                              key={ tag }
                              data-testid={ `${index}-${tag}-horizontal-tag` }
                            >
                              { tag }
                            </p>
                          ))
                        }
                      </div>
                    ) : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        { alcoholicOrNot }
                      </p>
                    )
                  }
                  <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
                  <ButtonShare2 index={ index } type={ type } id={ id } />
                </div>
              );
            }) }
        </div>
      </>
    );
  }
}

export default connect(null, null)(DoneRecipes);
