const DRINK_ENDPOINT_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_ENDPOINT_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_ENDPOINT_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const DRINK_ENDPOINT_MAIN_INGREDIEN = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const fetchDrinkObject = {
  fetchDrinksCategories: async () => {
    const response = await fetch(`${DRINK_ENDPOINT_CATEGORIES}`);
    const json = await response.json();

    return json;
  },
  fetchDrinksName: async (drinkName) => {
    const response = await fetch(`${DRINK_ENDPOINT_NAME}${drinkName}`);
    const json = await response.json();

    return json;
  },
  fetchDrinksFirstLetter: async (firstLetter) => {
    const response = await fetch(`${DRINK_ENDPOINT_FIRST_LETTER}${firstLetter}`);
    const json = await response.json();

    return json;
  },
  fetchDrinksMainIngredient: async (ingredient) => {
    const response = await fetch(`${DRINK_ENDPOINT_MAIN_INGREDIEN}${ingredient}`);
    const json = await response.json();

    return json;
  },
};

// fetchDrinkObject.fetchDrinkCategories();

export default fetchDrinkObject;
