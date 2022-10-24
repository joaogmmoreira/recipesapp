import PropTypes from 'prop-types';
import React from 'react';
import '../Style/RecipeCheckbox.css';
import {
  addRecipe,
  getRecipesInProgress,
} from '../services/recipesProgress';
import Loading from './Loading';

class RecipeCheckbox extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.handleClassName();
    this.getRecipeProgressBack();
  }

  getRecipeProgressBack = () => {
    const { element, id, pathname, validateCheckBoxes } = this.props;
    const path = pathname.includes('foods') ? 'meals' : 'cocktails';
    // console.log(path);
    const progress = getRecipesInProgress();
    // console.log(progress);

    if (progress[path][id]) {
      const setProgress = progress[path][id]
        .some((ingredient) => element === ingredient);

      this.setState({
        isChecked: setProgress,
      }, () => {
        this.handleClassName();
        this.setState({
          isLoading: false,
        }, () => {
          validateCheckBoxes();
        });
      });
    } else {
      this.setState({
        isLoading: false,
      }, () => {
        validateCheckBoxes();
      });
    }
  }

  addOrRemoveProgress = () => {
    const { element, id, pathname } = this.props;
    const { isChecked } = this.state;
    const path = pathname.includes('foods') ? 'meals' : 'cocktails';

    addRecipe(element, id, path, isChecked);
  }

  handleClassName = () => {
    const checkBox = document.querySelectorAll('.undone');
    return checkBox.forEach((element) => {
      if (element.checked) {
        const father = element.parentElement;
        father.className = 'done';
      }
    });
  }

  handleCheck = () => {
    const { validateCheckBoxes } = this.props;

    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }), () => {
      validateCheckBoxes();
      this.addOrRemoveProgress();
    });
  }

  render() {
    const { isChecked, isLoading } = this.state;
    const { element, index } = this.props;

    return isLoading ? <Loading /> : (
      <label
        data-testid={ `${index}-ingredient-step` }
        className={ isChecked ? 'done' : 'undone' }
        htmlFor={ `${element}-${index}` }
      >
        <input
          type="checkbox"
          id={ `${element}-${index}` }
          name={ element }
          checked={ isChecked }
          className={ isChecked ? 'checked' : 'unchecked' }
          onChange={ this.handleCheck }
        />
        {element}
      </label>
    );
  }
}

RecipeCheckbox.propTypes = {
  validateCheckBoxes: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default RecipeCheckbox;
