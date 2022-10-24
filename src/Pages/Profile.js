import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class Profile extends React.Component {
  getRecipes = () => {
    const { history } = this.props;
    history.push('/recipesapp/done-recipes');
  };

  getFavoriteRecipes = () => {
    const { history } = this.props;
    history.push('/recipesapp/favorite-recipes');
  };

  logout = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/recipesapp');
  };

  render() {
    const verifyLocalStorage = localStorage.getItem('user');
    const email = verifyLocalStorage && JSON.parse(verifyLocalStorage).email;

    return (
      <>
        <Header renderOnScreen={ false } title="Profile" history={ {} } url="" />
        <div>
          <h1 data-testid="profile-email" value={ email }>{ email }</h1>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ this.getRecipes }
          >
            Done Recipes
          </button>
          {/* <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ this.getFavoriteRecipes }
          >
            Favorite Recipes
          </button> */}
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.logout }
          >
            Logout
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(Profile);
