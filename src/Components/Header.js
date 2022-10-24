import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../Style/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = { searchBar: false };
    // Quando usar é necessário passar duas props.
    // renderOnScreen e title
    // renderOnScreen é um bool
    // title é uma string
  }

  render() {
    const { renderOnScreen, title, url, history } = this.props;
    const { searchBar } = this.state;
    const searchElement = (
      <div className="search-bar">
        <button
          type="button"
          onClick={ () => this.setState((prev) => ({ searchBar: !prev.searchBar })) }
          className="search-btn"
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search-icon" />
        </button>
        {
          searchBar && <SearchBar url={ url } history={ history } />
        }
      </div>
    );
    return (
      <header>
        <Link to="/recipesapp/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="user-icon"
            className="profile-btn"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {
          renderOnScreen && searchElement
        }
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderOnScreen: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  url: PropTypes.string.isRequired,
};
export default Header;
