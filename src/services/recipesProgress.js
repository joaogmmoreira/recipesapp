const IN_PROGRESS_RECIPES = 'inProgressRecipes';

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES))) {
  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify({
    cocktails: {},
    meals: {} }));
}
const readRecipesInProgress = () => JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));

const saveRecipesInProgress = (ingredient) => {
  // console.log(ingredient);
  localStorage
    .setItem(IN_PROGRESS_RECIPES, JSON.stringify(ingredient));
};

export const getRecipesInProgress = () => {
  const recipesInProgress = readRecipesInProgress();
  return recipesInProgress;
};

export const addRecipe = (ingredient, id, path, checked) => {
  // console.log(ingredient);
  const recipesInProgress = readRecipesInProgress();
  // const test = { [id]: [ingredient] };

  if (!recipesInProgress[path][id] && checked) {
    recipesInProgress[path] = { ...recipesInProgress[path], [id]: [ingredient] };
  } else if (checked) {
    recipesInProgress[path][id] = [...recipesInProgress[path][id], ingredient];
  } else {
    recipesInProgress[path][id] = recipesInProgress[path][id]
      .filter((element) => element !== ingredient);
  }
  saveRecipesInProgress(recipesInProgress);
};
