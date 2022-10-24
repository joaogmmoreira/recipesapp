import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchDrinkObject from '../services/fetchDrinkAPI';
import fetchFoodsObject from '../services/fetchFoodAPIs';
import checkLength from '../services/checkLength';
import { saveSearchAction } from '../redux/actions';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      search: { nameSearch: '', typeSearch: '' },
    };
  }

  alertOneResults = () => {
    const mensage = 'Your search must have only 1 (one) character';
    global.alert(mensage);
  };

  alertSelectionOption = () => {
    const mensage = 'Selecione uma opção';
    global.alert(mensage);
  };

  apiSearch = async () => {
    const { url, history, dispatchSearch } = this.props;
    const { search: { nameSearch, typeSearch } } = this.state;
    const formatUrl = url.charAt(1).toUpperCase() + url.slice(2, url.length);
    const getMethod = `fetch${formatUrl}`;
    const getServiceObj = url === '/foods' ? fetchFoodsObject : fetchDrinkObject;

    switch (typeSearch) {
    case 'ingredient':
      checkLength(getServiceObj[`${getMethod}MainIngredient`](nameSearch),
        url, history, dispatchSearch);
      break;
    case 'name':
      checkLength(getServiceObj[`${getMethod}Name`](nameSearch),
        url, history, dispatchSearch);
      break;
    case 'firstLetter':
      if (nameSearch.length > 1) {
        this.alertOneResults();
      } else {
        checkLength(getServiceObj[`${getMethod}FirstLetter`](nameSearch),
          url, history, dispatchSearch);
      }
      break;
    default:
      this.alertSelectionOption();
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState((prev) => ({
      search: {
        ...prev.search,
        [name]: value,
      },
    }));
  }

  search = () => {
    this.apiSearch();
  }

  render() {
    const { search: { nameSearch } } = this.state;
    return (
      <section>
        <div>
          <form className="filter">
            <input
              className="input-search-bar"
              type="text"
              name="nameSearch"
              data-testid="search-input"
              value={ nameSearch }
              onChange={ this.handleChange }
            />
            <label htmlFor="ingredient-search">
              Ingredient
              <input
                name="typeSearch"
                id="ingredient-search"
                type="radio"
                data-testid="ingredient-search-radio"
                value="ingredient"
                onClick={ this.handleChange }
              />
            </label>
            <label htmlFor="name-search">
              Name
              <input
                name="typeSearch"
                id="name-search"
                type="radio"
                data-testid="name-search-radio"
                value="name"
                onClick={ this.handleChange }
              />
            </label>
            <label htmlFor="first-letter-search">
              First Letter
              <input
                name="typeSearch"
                id="first-letter-search"
                type="radio"
                data-testid="first-letter-search-radio"
                value="firstLetter"
                onClick={ this.handleChange }
              />
            </label>
            <button type="button" data-testid="exec-search-btn" onClick={ this.search }>
              Filter
            </button>
          </form>
        </div>
        <div>
          {
          }
        </div>
      </section>
    );
  }
}

SearchBar.propTypes = {
  dispatchSearch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  url: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (value) => dispatch(saveSearchAction(value)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
