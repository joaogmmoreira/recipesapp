import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../Style/Footer.css';

function Footer() {
  const history = useHistory();
  const drinkPath = () => {
    history.push('/recipesapp/drinks');
  };
  const foodPath = () => {
    history.push('/recipesapp/foods');
  };
  return (
    <footer data-testid="footer" className="footer">
      <button type="button" onClick={ foodPath } className="footer-btn">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meal Icon" />
      </button>
      <button type="button" onClick={ drinkPath } className="footer-btn">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks Icon" />
      </button>
    </footer>
  );
}
export default Footer;
