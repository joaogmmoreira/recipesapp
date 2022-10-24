import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Foods from '../Components/Foods';
import Drinks from '../Components/Drinks';
import Footer from '../Components/Footer';
import '../Style/Recipes.css';

class Recipes extends React.Component {
  render() {
    const { history: { location: { pathname } }, history } = this.props;

    return (
      <div>
        { pathname === '/recipesapp/foods'
          ? <Foods url={ pathname } history={ history } />
          : <Drinks url={ pathname } history={ history } /> }
        <Footer />
      </div>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(Recipes);
