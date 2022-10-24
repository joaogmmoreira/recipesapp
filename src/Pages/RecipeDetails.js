import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailsComponent from '../Components/DetailsComponent';
import Loading from '../Components/Loading';

class RecipeDetails extends Component {
  constructor() {
    super();
    this.state = { unmount: false };
  }

  changeUnmount = () => {
    this.setState(() => ({
      unmount: true,
    }), () => {
      this.setState({
        unmount: false,
      });
    });
  }

  handleClick = () => {
    const { match: { params: { id } }, history } = this.props;
    const { location: { pathname } } = this.props;

    if (pathname.includes('drinks')) {
      history.push(`/recipesapp/drinks/${id}/in-progress`);
    }

    if (pathname.includes('foods')) {
      history.push(`/recipesapp/foods/${id}/in-progress`);
    }
  }

  render() {
    const { match: { params: { id } }, match: { url } } = this.props;
    const { unmount } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Receita
        </button>
        {
          !unmount ? <DetailsComponent
            changeUnmount={ this.changeUnmount }
            id={ id }
            url={ url }
          />
            : <Loading />
        }
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    includes: PropTypes.func,
  }).isRequired,
};

export default RecipeDetails;
