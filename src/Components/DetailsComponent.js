import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';
import { saveInfoObj } from '../redux/actions/index';

import '../Style/RecipesDetails.css';
import ShareFavBtn from './ShareFavBtn';

class DetailsComponent extends Component {
  constructor() {
    super();
    this.SIX = 6;
    this.state = {
      info: {},
      recomendations: [],
      isFood: true,
      infoEndpoint: '',
      recomendationEndpoint: '',
    };
  }

  componentDidMount() {
    this.groupAllFunctions();
  }

  groupAllFunctions = () => {
    this.useCorrectAPI();

    const { saveInfoObjAction } = this.props;
    const { info } = this.state;
    saveInfoObjAction(info);
  }

  useCorrectAPI = () => {
    const { url } = this.props;
    if (url.includes('foods')) {
      this.setState({
        infoEndpoint: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
        recomendationEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      }, async () => {
        await this.requestRecipeDetails();
        await this.requestRecomendations();
      });
    } else {
      this.setState({
        isFood: false,
        infoEndpoint: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
        recomendationEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      }, async () => {
        await this.requestRecipeDetails();
        await this.requestRecomendations();
      });
    }
  }

  handleRequest = async (endpoint, isInfo) => {
    const { id } = this.props;
    const formateEndpoint = isInfo ? `${endpoint}${id}` : endpoint;
    const request = await fetch(formateEndpoint);
    const data = await request.json();

    return data;
  }

  requestRecipeDetails = async () => {
    const { isFood, infoEndpoint } = this.state;
    const data = await this.handleRequest(infoEndpoint, true);
    this.setState({
      info: isFood ? data.meals[0] : data.drinks[0],
    });
  }

  requestRecomendations = async () => {
    const { isFood, recomendationEndpoint } = this.state;
    const data = await this.handleRequest(recomendationEndpoint, false);
    this.setState({
      recomendations: isFood ? data.drinks : data.meals,
    });
  }

  formateInfo = (info) => {
    let formatedInfo = [];
    const infoObj = Object.entries(info);
    const infoIng = infoObj
      .filter((findIng) => findIng[0].includes('strIng') && findIng[1])
      .map((getIng) => getIng[1]);
    const infoMeas = infoObj
      .filter((findMeas) => findMeas[0].includes('strMeasu') && findMeas[1])
      .map((getMeas) => getMeas[1]);

    for (let index = 0; index < infoIng.length; index += 1) {
      formatedInfo = [...formatedInfo, [infoIng[index], infoMeas[index]]];
    }
    return formatedInfo;
  }

  renderInfoIngAndMeas = (getMeasAndIng, index) => (
    <p
      key={ `${getMeasAndIng}${index}` }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {`${getMeasAndIng[0]} ${getMeasAndIng[1] || ''}` }
    </p>
  )

  renderRec = (isFood, recInfo, index) => {
    const { changeUnmount } = this.props;
    return (
      <Link
        data-testid={ `${index}-recomendation-card` }
        key={ isFood ? recInfo.idDrink : recInfo.idMeal }
        to={ isFood
          ? `/recipesapp/drinks/${recInfo.idDrink}`
          : `/recipesapp/foods/${recInfo.idMeal}` }
        onClick={ changeUnmount }
      >
        <div className="recomendation">
          <img
            src={ isFood ? recInfo.strDrinkThumb : recInfo.strMealThumb }
            alt={ isFood ? recInfo.strDrink : recInfo.strMeal }
            className="recipe-img"
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            { isFood ? recInfo.strDrink : recInfo.strMeal }
          </p>
        </div>
      </Link>
    );
  }

  render() {
    const { info, recomendations, isFood } = this.state;
    const getInfoFormated = this.formateInfo(info);

    return (
      <main>
        <img
          src={ isFood ? info.strMealThumb : info.strDrinkThumb }
          width="200"
          alt={ info.strMeal }
          data-testid="recipe-photo"
          className="recipe-detail-img"
        />
        <h2 data-testid="recipe-title">{ isFood ? info.strMeal : info.strDrink}</h2>
        <h3 data-testid="recipe-category">{info.strCategory}</h3>
        {
          !isFood && <h3 data-testid="recipe-category">{ info.strAlcoholic }</h3>
        }
        <ReactPlayer
          width="80%"
          height="100%"
          className="video"
          data-testid="video"
          url={ isFood ? info.strYoutube : info.strVideo }
          config={ {
            youtube: {
              playerVars: { origin: 'http://localhost:3000/', showinfo: 0 },
            },
          } }
        />
        <ShareFavBtn infoObj={ info } />
        <article className="instructions">
          <h2>instructions</h2>
          <p data-testid="instructions">{ info.strInstructions }</p>
        </article>
        <article className="ingredients">
          <h2>Ingredients</h2>
          {
            isFood
              ? getInfoFormated.map(this.renderInfoIngAndMeas)
              : getInfoFormated.map(this.renderInfoIngAndMeas)
          }
        </article>
        <section className="recommended">
          {
            recomendations
              .slice(0, this.SIX)
              .map((recInfo, index) => this.renderRec(isFood, recInfo, index))
          }
        </section>
      </main>
    );
  }
}

DetailsComponent.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  changeUnmount: PropTypes.func.isRequired,
  saveInfoObjAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveInfoObjAction: (infoObj) => dispatch(saveInfoObj(infoObj)),
});

export default connect(null, mapDispatchToProps)(DetailsComponent);
